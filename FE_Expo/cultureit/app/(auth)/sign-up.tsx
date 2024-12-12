import {ScrollView, Text, View} from 'react-native'
import React, {useState} from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import {FormField} from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import {Link, router} from "expo-router";
import axios from "axios";
import { DateFormField } from "@/components/DateFormField";

export default function SignUp() {

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: new Date(),
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = () => {
    setIsSubmitting(true);

    const {confirmPassword, ...payload} = form
    //payload.date_of_birth = payload.date_of_birth.toString();

    axios({
      url: `${process.env.EXPO_PUBLIC_API_URL}/v1/users`,
      method: "POST",
      data: payload,
    }).then(() => router.push('/log-in'))
      .catch((err) => console.log("error", err.data))
      .finally(() => setIsSubmitting(false))

  }

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Text className="text-5xl font-inter_bold text-primary text-center">
            Culture It!
          </Text>

          <FormField
            title="First Name"
            value={form.first_name}
            handleChangeText={(e) => setForm({
              ...form,
              first_name: e
            })}
            otherStyles="mt-7"
            autoComplete="given-name"
          />

          <FormField
            title="Last Name"
            value={form.last_name}
            handleChangeText={(e) => setForm({
              ...form,
              last_name: e
            })}
            otherStyles="mt-7"
            autoComplete="family-name"
          />

            <DateFormField
                title="Date of Birth"
                value={form.date_of_birth}
                handleChangeDate={(date) =>
                    setForm({
                        ...form,
                        date_of_birth: date,
                    })
                }
                placeholder="Select your date of birth"
            />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({
              ...form,
              email: e
            })}
            otherStyles="mt-7"
            keyboardType="email-address"
            autoComplete="email"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({
              ...form,
              password: e
            })}
            otherStyles="mt-7"
            isSecureText
          />

          <FormField
            title="Confirm Password"
            value={form.confirmPassword}
            handleChangeText={(e) => setForm({
              ...form,
              confirmPassword: e
            })}
            otherStyles="mt-7"
            isSecureText
          />

          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isDisabled={isSubmitting}
          />

          <View className="justifiy-center items-center mt-20 gap-2">
            <Text className="text-lg text-primary font-inter_regular">
              Have an account already?
            </Text>

            <Link href="/log-in" className="text-lg font-inter_bold text-primary">
              <Text className="text-lg font-inter_bold text-primary">
                Log in
              </Text>
            </Link>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}