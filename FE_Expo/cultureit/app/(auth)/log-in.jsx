import {View, Text, ScrollView} from 'react-native'
import React, {useState} from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CustomButton from "@/components/CustomButton";
import {Link, router} from "expo-router";

const LogIn = () => {

    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const [isSubmitting, setIsSubmitting] = useState(false)

    const submit = () => {

    }

    return (
      <SafeAreaView className="bg-white h-full">
        <ScrollView>
            <View className="w-full justify-center min-h-[85vh] px-4 my-6">
                <Text className = "text-5xl font-inter_bold text-primary text-center">
                    Culture It!
                </Text>

                <FormField
                    title = "Email"
                    value = {form.email}
                    handleChangeText = {(e) => setForm({...form,
                        email: e})}
                    otherStyles="mt-7"
                    keyboardType="email-address"
                />

                <FormField
                    title = "Password"
                    value = {form.password}
                    handleChangeText = {(e) => setForm({...form,
                        password: e})}
                    otherStyles="mt-7"
                />

                <CustomButton
                    title = "Log In"
                    handlePress={submit}
                    containerStyles="mt-7"
                    isLoading = {isSubmitting}
                    handlePress={() => router.push('/map')}
                />

                <View className="justifiy-center items-center mt-20 gap-2">
                    <Text className="text-lg text-primary font-inter_regular">
                        Don't have an account?
                    </Text>

                    <Link href="/sign-up " className="text-lg font-inter_bold text-primary">
                        Sign Up
                    </Link>
                </View>

            </View>
        </ScrollView>
      </SafeAreaView>
  )
}

export default LogIn