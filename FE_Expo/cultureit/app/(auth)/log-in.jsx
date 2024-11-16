import {View, Text, ScrollView} from 'react-native'
import React, {useState} from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import FormField from "../../components/FormField";

const LogIn = () => {

    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    return (
      <SafeAreaView className="bg-white h-full">
        <ScrollView>
            <View className="w-full justify-center min-h-[60vh] px-4 my-6">
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
            </View>
        </ScrollView>
      </SafeAreaView>
  )
}

export default LogIn