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

const EulaScreen: React.FC = () => {
    const { openDrawer } = useDrawer()
    const router = useRouter()


    return (
        <Page>
            <Drawer.Screen 
                options={{
                    header: () => (
                        <Header className='px-3'>
                            <View  className='w-screen pr-6'>
                                <View className='flex flex-row items-center'>
                                    <Pressable onPress={() => router.push("settings")} className=' mt-6  ml-3 mr-6 w-6 h-6 rounded-md border-[#EFEFEF33]  border  p-5 items-center justify-center'>
                                        <ArrowLeft size="14px" stroke="white"/>
                                    </Pressable>
                                    <Text className="mt-6 text-white text-xl font-bold">
                                        End User License Agreement
                                    </Text>
                                </View>
                            </View>
                        </Header>
                    )
                }}
            />

            <View style ={{height: "85%" }}>
                <ScrollView className='p-6'contentContainerStyle={{ paddingBottom: 20 }} >
                    <H1>End User License Agreement (EULA) </H1>
                    <Text className='text-light-grey mt-4'>Effective Date: June 16, 2024</Text>
                    <H2>1. Introduction</H2>
                    <Text className='text-light-grey mt-4'>
                    This End User License Agreement ("Agreement") is a legal agreement between you ("User") and [Sonder Inc] ("Company") for the use of the Sonder application ("App"). By downloading, installing, or using the App, you agree to be bound by the terms of this Agreement.
                    </Text>
                    <H2>2. License Grant</H2>
                    <Text className='text-light-grey mt-4'>
                    Subject to your compliance with the terms of this Agreement, the Company grants you a non-exclusive, non-transferable, limited license to use the App for personal, non-commercial purposes.
                    </Text>
                    <H2>3. Ownership</H2>
                    <Text className='text-light-grey mt-4'>
                    The App and all associated intellectual property rights are owned by the Company. This Agreement does not transfer any ownership rights to you.
                    </Text>
                    <H2>4. User Obligations</H2>
                    <Text className='text-light-grey mt-4'>
                    You agree to:
                    {'\n\n'}
                    •	Comply with all terms and conditions of this Agreement.
                    {'\n\n'}
                    •	Use the App only for lawful purposes and in accordance with this Agreement.
                    {'\n\n'}
                    •	Not modify, reverse engineer, decompile, or disassemble the App.
                    </Text>
                    <H2>5. Restrictions on Use</H2>
                    <Text className='text-light-grey mt-4'>
                    You are prohibited from:
                    {'\n\n'}
                    •	Using the App for any commercial purposes without prior written consent from the Company.
                    {'\n\n'}
                    •	Distributing, leasing, renting, lending, or sublicensing the App.
                    {'\n\n'}
                    •	Using the App in any manner that could damage, disable, overburden, or impair the App.
                
                    </Text>
                    <H2>6. Termination</H2>
                    <Text className='text-light-grey mt-4'>
                    This Agreement is effective until terminated. The Company may terminate this Agreement at any time without notice if you fail to comply with any term of this Agreement. Upon termination, you must cease all use of the App and delete all copies.
                    </Text>
                    <H2>8. Privacy Policy</H2>
                    <Text className='text-light-grey mt-4'>
                    Your use of the App is also governed by our Privacy Policy, by using the App, you consent to the collection and use of your information as outlined in the Privacy Policy.
                    </Text>
                    <H2>8. Disclaimers and Limitation of Liability</H2>
                    <Text className='text-light-grey mt-4'>
                    The App is provided "as is" without warranty of any kind. The Company disclaims all warranties, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement. In no event shall the Company be liable for any special, incidental, indirect, or consequential damages whatsoever.
                    </Text>
                    <H2>10. Indemnification</H2>
                    <Text className='text-light-grey mt-4'>You agree to indemnify and hold the Company harmless from any claims, damages, or losses, including attorney's fees, arising out of your use of the App, your violation of this Agreement, or your violation of any rights of another.</Text>
                    
                    <H2>10. Changes to Terms</H2>
                    <Text className='text-light-grey mt-4'>We may update these Terms from time to time. We will notify you of any changes by posting the new Terms on our website or through the App. Your continued use of the App after such changes constitutes your acceptance of the new Terms.</Text>
                    <H2>11. Governing Law and Dispute Resolution</H2>
                    <Text className='text-light-grey mt-4'>The laws of the Country, excluding its conflicts of law rules, shall govern this Agreement and your use of the App. Your use of the Application may also be subject to other local, state, national, or international laws.</Text>
                    <H2>12. Contact Information</H2>
                    
                    <Text className='text-light-grey mt-4'>If you have any questions about these Agreement, please contact us at <Text style={{color: 'blue'}} onPress={() => Linking.openURL('mailto:fortunealebiosu710@gmail.com')}> fortunealebiosu710@gmail.com</Text></Text>
                    <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1, marginVertical: 10 }} />
                    <H2>Acceptance</H2>
                    <Text className='text-light-grey mt-4'>By clicking "Accept" or using the App, you acknowledge that you have read and understood these Agreement and agree to be bound by its terms and conditions.</Text>
                    
                </ScrollView>
            </View>
        </Page>
    );
};

export default EulaScreen;