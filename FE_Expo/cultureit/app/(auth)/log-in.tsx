import {ScrollView, Text, View} from 'react-native'
import React, {useState} from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import {FormField} from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import {Link, router} from "expo-router";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';



export default function LogIn() {

  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = () => {
    setIsSubmitting(true);

    axios({
      url: `${process.env.EXPO_PUBLIC_API_URL}/v1/auth`,
      method: "POST",
      data: form,
    }).then((res) => {
      console.log(res.data.token)

      SecureStore.setItem('secure_token', res.data.token);
      SecureStore.setItem('secure_user_id', res.data.userId.toString());


      router.push('/map');
    }).catch((err) => console.log("error", err))
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
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({
              ...form,
              email: e
            })}
            otherStyles="mt-7"
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
            autoComplete="password"
            isSecureText
          />

          <CustomButton
            title="Log In"
            handlePress={submit}
            containerStyles="mt-7"
            isDisabled={isSubmitting}
          />

          <View className="justifiy-center items-center mt-20 gap-2">
            <Text className="text-lg text-primary font-inter_regular">
              Don't have an account?
            </Text>

            <Link href="/sign-up" className="text-lg font-inter_bold text-primary">
              <Text className="text-lg font-inter_bold text-medium_primary">
                Sign Up
              </Text>
            </Link>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}