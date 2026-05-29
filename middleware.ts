import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import createMiddleware from "next-intl/middleware";

import { routing } from "./src/i18n/routing";

const intlMiddleware = createMiddleware(routing);

const protectedRoutes = ["/dashboard", "/admin"];
const authRoutes = ["/login", "/register"];
const adminRoutes = ["/admin"];

function getLocaleAndBasePathname(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  if (first && routing.locales.includes(first as (typeof routing.locales)[number])) {
    const rest = segments.slice(1);
    return {
      locale: first,
      basePathname: rest.length ? `/${rest.join("/")}` : "/",
    };
  }

  return { locale: routing.defaultLocale, basePathname: pathname || "/" };
}

export async function middleware(request: NextRequest) {
  const response = intlMiddleware(request);
  if (response.headers.get("Location")) {
    return response;
  }

  const { locale, basePathname } = getLocaleAndBasePathname(request.nextUrl.pathname);

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    const isProtected = protectedRoutes.some((p) => basePathname.startsWith(p));

    if (isProtected) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = `/${locale}/login`;
      loginUrl.searchParams.set(
        "error",
        "Server configuration error. Missing Supabase environment variables."
      );
      return NextResponse.redirect(loginUrl);
    }

    return response;
  }

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isProtected = protectedRoutes.some((p) => basePathname.startsWith(p));
  const isAuthRoute = authRoutes.some((p) => basePathname.startsWith(p));
  const isAdminRoute = adminRoutes.some((p) => basePathname.startsWith(p));

  if (isProtected && !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = `/${locale}/login`;
    return NextResponse.redirect(loginUrl);
  }

  if (isAdminRoute && user) {
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    if (!adminEmail || user.email?.toLowerCase() !== adminEmail.toLowerCase()) {
      const dashboardUrl = request.nextUrl.clone();
      dashboardUrl.pathname = `/${locale}/dashboard`;
      return NextResponse.redirect(dashboardUrl);
    }
  }

  if (isAuthRoute && user) {
    const dashboardUrl = request.nextUrl.clone();
    dashboardUrl.pathname = `/${locale}/dashboard`;
    return NextResponse.redirect(dashboardUrl);
  }

  return response;
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
