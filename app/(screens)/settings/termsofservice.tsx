import React from 'react';
import Page from "../../../components/page";
import { ScrollView, View, Text,Pressable,Linking } from "react-native";
import Header from '../../../components/header';
import { useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import useDrawer from "../../../hooks/drawer";
import { Activity, ArrowLeft, Calendar } from "lucide-react-native";

const H1 = ({ children }) => <Text className=" text-white text-2xl font-bold ">{children}</Text>;
const H2 = ({ children }) => <Text className=" text-white text-xl font-bold mt-4">{children}</Text>;


const Termsofservice = ()=> {
    const { openDrawer } = useDrawer()
    const router = useRouter()


    return (
        <View>
            <Drawer.Screen 
                options={{
                    header: () => (
                        <Header className='px-3 mb-4'>
                            <View  className='w-screen pr-6'>
                                <View className='flex flex-row items-center'>
                                    <Pressable onPress={() => router.push("settings")} className=' mt-6  ml-3 mr-6 w-6 h-6 rounded-md border-[#EFEFEF33]  border  p-5 items-center justify-center'>
                                        <ArrowLeft size="14px" stroke="white"/>
                                    </Pressable>
                                    <Text className="mt-6 text-white text-xl font-bold">
                                        Terms of Service
                                    </Text>
                                </View>
                            </View>
                        </Header>
                    )
                }}
            />

            <View style ={{ paddingBottom: 50 }}>
                <ScrollView className='p-6'contentContainerStyle={{ paddingBottom: 20 }} >
                    <H1>Terms of Service</H1>

                    <Text className='text-light-grey mt-4'>Effective Date: July 16, 2024</Text>
                    
                    <H2>1. Acceptance of Terms</H2>
                    <Text className='text-light-grey mt-4'>
                    By accessing and using the Sonder application ("App"), you agree to comply with and be bound by these Terms of Use ("Terms"). If you do not agree to these Terms, please do not use the App.
                    </Text>
                    <H2>2. Description of Service</H2>
                    <Text className='text-light-grey mt-4'>
                    Sonder allows users to connect based on their Spotify music tastes. By using the App, you can interact with other users, share music preferences, and more.
                    </Text>
                    <H2>3. User Accounts</H2>
                    <Text className='text-light-grey mt-4'>
                    You may be required to create an account to use certain features of the App. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
                    </Text>
                    <H2>4. Acceptable Use</H2>
                    <Text className='text-light-grey mt-4'>
                    You agree not to use the App for any unlawful or prohibited activities, including but not limited to:
                    {'\n\n'}
                    •	Harassing, threatening, or abusing others
                    {'\n\n'}
                    •	Uploading or sharing content that is offensive, defamatory, or infringing on intellectual property rights
                    {'\n\n'}
                    •	Engaging in activities that disrupt or harm the App or its users
                    {'\n\n'}
                    You retain ownership of any content you upload or share through the App. However, by doing so, you grant Sonder a non-exclusive, royalty-free, worldwide license to use, display, and distribute your content in connection with the App.
                    </Text>
                    <H2>6. Privacy Policy</H2>
                    <Text className='text-light-grey mt-4'>
                    Your use of the App is also governed by our Privacy Policy. By using the App, you consent to the collection and use of your information as outlined in the Privacy Policy.
                    </Text>
                    <H2>7. Termination</H2>
                    <Text className='text-light-grey mt-4'>
                    We reserve the right to terminate or suspend your account and access to the App at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users of the App.
                    </Text>
                    <H2>8. Disclaimers and Limitation of Liability</H2>
                    <Text className='text-light-grey mt-4'>
                    The App is provided "as is" without warranties of any kind. We disclaim all warranties, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, and non-infringement. We are not liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of the App.
                    </Text>
                    <H2>9. Governing Law</H2>
                    <Text className='text-light-grey mt-4'>The laws of the Country, excluding its conflicts of law rules, shall govern this Agreement and your use of the App. Your use of the Application may also be subject to other local, state, national, or international laws.</Text>
                    
                    <H2>10. Changes to Terms</H2>
                    <Text className='text-light-grey mt-4'>We may update these Terms from time to time. We will notify you of any changes by posting the new Terms on our website or through the App. Your continued use of the App after such changes constitutes your acceptance of the new Terms.</Text>
                    
                    <H2>11. Contact Information</H2>
                    <Text className='text-light-grey mt-4'>If you have any questions about these Terms, please contact us at <Text style={{color: 'blue'}} onPress={() => Linking.openURL('mailto:fortunealebiosu710@gmail.com')}> fortunealebiosu710@gmail.com</Text></Text>
                    <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1, marginVertical: 10 }} />
                    <H2>Acceptance</H2>
                    <Text className='text-light-grey mt-4'>By clicking "Accept" or using the App, you acknowledge that you have read and understood these Terms and agree to be bound by them</Text>
                    
                </ScrollView>
            </View>
        </View>
    );
}
export default Termsofservice;