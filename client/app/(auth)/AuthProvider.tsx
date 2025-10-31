"use client";

import React, { useEffect } from "react";
import { Amplify } from "aws-amplify";

import {
  Authenticator,
  Heading,
  Radio,
  RadioGroupField,
  useAuthenticator,
  View,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { usePathname, useRouter } from "next/navigation";
import { useGetAuthUserQuery } from "@/store/api";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID!,
      userPoolClientId:
        process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_APP_CLIENT_ID!,
    },
  },
});

const components = {
  SignIn: {
    Header() {
      return (
        <View className="mt-4 mb-7 ">
          <Heading level={3} className="text-2xl! font-bold!">
            RENT
            <span className="text-secondary-500 hover:text-primary-300!">
              IFUL
            </span>
          </Heading>
          <p className="text-muted-foreground mt-2">
            <span className="font-bold  ">Welcome!</span> Please Sign in to
            continue
          </p>
        </View>
      );
    },
    Footer() {
      const router = useRouter();
      const { toForgotPassword } = useAuthenticator();
      return (
        <View className="text-center mt-2 flex justify-between max-sm:flex-col">
          <button
            onClick={toForgotPassword}
            className="mb-2 cursor-pointer hover:underline"
          >
            Forgot Password?
          </button>
          <p className="text-muted-foreground">
            Don&apos;t have an account?
            <button
              onClick={() => router.replace("/sign-up")}
              className="font-bold text- hover:underline cursor-pointer p-0"
            >
              <span className="font-medium text-primary-500 ">
                Sign Up Here
              </span>
            </button>
          </p>
        </View>
      );
    },
  },

  ForgotPassword: {
    Header() {
      return (
        <View className="my-3 ">
          <Heading level={3} className="text-2xl! font-bold!">
            RENT
            <span className="text-secondary-500 hover:text-primary-300!">
              IFUL
            </span>
          </Heading>
          <p className="text-muted-foreground mt-2">
            Please provide below details to reset the password
          </p>
        </View>
      );
    },
  },

  SignUp: {
    FormFields() {
      const { validationErrors } = useAuthenticator();
      return (
        <>
          <Authenticator.SignUp.FormFields />
          <RadioGroupField
            legend="Role"
            name="custom:role"
            isRequired
            hasError={!!validationErrors?.["custom:role"]}
            errorMessage={validationErrors?.["custom:role"]}
          >
            <Radio value="tenant">Tenant</Radio>
            <Radio value="manager">Manger</Radio>
          </RadioGroupField>
        </>
      );
    },
    Header() {
      return (
        <View className="mt-4 mb-7 ">
          <Heading level={3} className="text-2xl! font-bold!">
            RENT
            <span className="text-secondary-500 hover:text-primary-300!">
              IFUL
            </span>
          </Heading>
          <p className="text-muted-foreground mt-2">
            <span className="font-bold  ">Welcome!</span> Please Sign Up to
            continue
          </p>
        </View>
      );
    },
    Footer() {
      const router = useRouter();

      return (
        <View className="text-center mt-4">
          <p className="text-muted-foreground">
            Already have an account?
            <button
              onClick={() => router.replace("/sign-in")}
              className="font-bold text- hover:underline cursor-pointer p-0"
            >
              <span className="font-medium text-primary-500 ">
                Sign In Here
              </span>
            </button>
          </p>
        </View>
      );
    },
  },
};

const formFields = {
  signIn: {
    username: {
      order: 1,
      placeholder: "Enter your email",
      label: "Email",
      isRequired: true,
    },
    password: {
      order: 2,
      placeholder: "Enter your password",
      label: "Password",
      isRequired: true,
    },
  },
  signUp: {
    username: {
      order: 1,
      placeholder: "Choose a username",
      label: "Username",
      isRequired: true,
    },
    email: {
      order: 2,
      placeholder: "Enter your email address",
      label: "Email",
      isRequired: true,
    },
    password: {
      order: 3,
      placeholder: "Create a password",
      label: "Password",
      isRequired: true,
    },
    confirm_password: {
      order: 4,
      placeholder: "Confirm your password",
      label: "Confirm Password",
      isRequired: true,
    },
  },
};

const Auth = ({ children }: { children: React.ReactNode }) => {
  const { data: authUser, isLoading: authLoading } = useGetAuthUserQuery();

  const router = useRouter();
  const pathname = usePathname();

  const isAuthPage = pathname.match(/^\/(sign-in|sign-up)$/);
  const isDashboardPage =
    pathname.startsWith("/manager") || pathname.startsWith("/tenant");

  // Redirect authenticated user away from auth pages
  useEffect(() => {
    if (authLoading) return;

    if (authUser && isAuthPage) {
      router.push("/");
    } else if (!authUser && isDashboardPage) {
      router.replace("/sign-in");
    }
  }, [authUser, isAuthPage, router, isDashboardPage, authLoading]);

  // Allow access to public pages without authentication

  if (!isAuthPage && !isDashboardPage) {
    return <>{children}</>;
  }

  if (authLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Authenticator
        initialState={pathname.includes("sign-up") ? "signUp" : "signIn"}
        className=" max-w-xl"
        components={components}
        formFields={formFields}
      >
        {children}
      </Authenticator>
    </div>
  );
};

export default Auth;
