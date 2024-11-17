import {View, Text, ScrollView} from 'react-native'
import React, {useState} from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CustomButton from "@/components/CustomButton";
import {Link} from "expo-router";

const SignUp = () => {

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
                        title = "First Name"
                        value = {form.firstName}
                        handleChangeText = {(e) => setForm({...form,
                            firstName: e})}
                        otherStyles="mt-7"
                    />

                    <FormField
                        title = "Last Name"
                        value = {form.lastName}
                        handleChangeText = {(e) => setForm({...form,
                            lastName: e})}
                        otherStyles="mt-7"
                    />

                    <FormField
                        title = "Date of Birth"
                        value = {form.dateOfBirth}
                        handleChangeText = {(e) => setForm({...form,
                            dateOfBirth: e})}
                        otherStyles="mt-7"
                    />

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

                    <FormField
                        title = "Confirm Password"
                        value = {form.confirmPassword}
                        handleChangeText = {(e) => setForm({...form,
                            confirmPassword: e})}
                        otherStyles="mt-7"
                    />

                    <CustomButton
                        title = "Sign Up"
                        handlePress={submit}
                        containerStyles="mt-7"
                        isLoading = {isSubmitting}
                    />

                    <View className="justifiy-center items-center mt-20 gap-2">
                        <Text className="text-lg text-primary font-inter_regular">
                            Have an account already?
                        </Text>

                        <Link href="/log-in " className="text-lg font-inter_bold text-primary">
                            Log in
                        </Link>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignUp