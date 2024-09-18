import React from "react";
import Page from "../../../components/page";
import { ScrollView, View, Text, Pressable, Linking } from "react-native";
import Header from "../../../components/header";
import { useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import useDrawer from "../../../hooks/drawer";
import { Activity, ArrowLeft, Calendar } from "lucide-react-native";
import CustomBackButton from "../../../components/CustomBackButton";

const H1 = ({ children }) => (
  <Text className=" text-white text-2xl font-bold ">{children}</Text>
);
const H2 = ({ children }) => (
  <Text className=" text-white text-xl font-bold mt-4">{children}</Text>
);

const Privacy = () => {
  // Add your component logic here
  const { openDrawer } = useDrawer();
  const router = useRouter();

  return (
    <View>
      <Drawer.Screen
        options={{
          header: () => (
            <Header className="px-3">
              <View className="w-screen pr-6">
                <View className="flex flex-row items-center">
                  <CustomBackButton
                    forcedDestination="/settings"
                    className="mr-6"
                  />
                  <Text className="mt-6 text-white text-xl font-bold">
                    Privacy Policy
                  </Text>
                </View>
              </View>
            </Header>
          ),
        }}
      />

      <View style={{ paddingBottom: 50 }}>
        <ScrollView
          className="p-6"
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <H1>Privacy Policy</H1>
          <Text className="text-light-grey mt-4">
            Effective Date: July 16, 2024
          </Text>
          <H2>1. Introduction</H2>
          <Text className="text-light-grey mt-4">
            We are committed to protecting your privacy. This Privacy Policy
            explains how we Sonder Inc (“Sonder”) collect, use, disclose, and
            safeguard your information when you use our mobile application (“Our
            service”). For the purposes of this Privacy Policy, ‘we’, ‘us’ and
            ‘our’ refers to Sonder and ‘you’ refers to you, the user of the
            Service. Please read this policy carefully to understand our
            practices regarding your information and how we will treat it.
          </Text>
          <H2>2. Information We Collect</H2>
          <Text className="text-light-grey mt-4">
            For a better experience, while using our Service, We may require you
            to provide us with certain personally identifiable information.
          </Text>
          <Text className="text-light-grey mt-4">
            We collect the following types of information when you use our
            service:
          </Text>
          <Text className="text-light-grey mt-4">
            <Text className="font-bold">Personal Information:</Text> When you
            connect your Spotify account, we may collect your username, profile
            picture, and other profile information from Spotify to facilitate
            matching with other users.
          </Text>
          <Text className="text-light-grey mt-4">
            <Text className="font-bold">Usage Information: </Text> We may
            collect information about how you use our services, such as your
            interactions with other users, preferences, and settings.
          </Text>
          <H2>3. How We Use Your Information</H2>
          <Text className="text-light-grey mt-4">
            We use the information we collect in the following ways:
          </Text>
          <Text className="text-light-grey mt-4">
            • To personalize your experience
          </Text>
          <Text className="text-light-grey mt-4">
            • To improve our app and develop new features and services.
          </Text>
          <Text className="text-light-grey mt-4">
            • To communicate with you, either directly or through partners,
            regarding updates, offers, and promotional materials.
          </Text>
          <Text className="text-light-grey mt-4">
            • To provide customer support
          </Text>
          <Text className="text-light-grey mt-4">
            • To detect, prevent and address technical issues
          </Text>
          <Text className="text-light-grey mt-4">
            • To monitor the usage of our Service
          </Text>
          <Text className="text-light-grey mt-4">
            • For any other purpose with your consent.
          </Text>
          <Text className="text-light-grey mt-4">
            • In any other way we may describe when you provide the information
          </Text>
          <H2>4. Sharing Your Information</H2>
          <Text className="text-light-grey mt-4">
            We may share your information in the following circumstances:
          </Text>
          <Text className="text-light-grey mt-4">
            <Text className="font-bold">• With Your Consent:</Text> We may share
            your information when you give us consent to do so.
          </Text>
          <Text className="text-light-grey mt-4">
            <Text className="font-bold">• Service Providers:</Text> We may share
            your information with third-party service providers who help us
            provide and improve our services.
          </Text>
          <Text className="text-light-grey mt-4">
            <Text className="font-bold">• Legal Compliance:</Text> We may
            disclose your information if required by law or to protect our
            rights or the rights of others.
          </Text>
          <H2>5. Cookies</H2>
          <Text className="text-light-grey mt-4">
            Cookies are files with a small amount of data that are commonly used
            as anonymous unique identifiers. These are sent to your browser from
            the websites that you visit and are stored on your device's internal
            memory.
          </Text>
          <Text className="text-light-grey mt-4">
            This Service does not use these "cookies" explicitly. However, the
            app may use third-party code and libraries that use "cookies" to
            collect Information and improve their services. You have the option
            to either accept or refuse these cookies and know when a cookie is
            being sent to your device. If you choose to refuse our cookies, you
            may not be able to use some portions of this Service.
          </Text>
          <H2>6. Security of Your Information</H2>
          <Text className="text-light-grey mt-4">
            We take steps to protect your information using commercially
            reasonable safeguards to prevent unauthorized access, use, or
            disclosure but remember that no method of transmission over the
            internet, or method of electronic storage is 100% secure and
            reliable, and We cannot guarantee its absolute security
          </Text>
          <H2>7. CI/CD tools</H2>
          <Text className="text-light-grey mt-4">
            We may use third-party Service Providers to automate the development
            process of our Service.{" "}
          </Text>
          <Text className="font-bold">Github</Text>
          <Text className="text-light-grey mt-4">
            GitHub is provided by GitHub, Inc.
            {"\n\n"}
            GitHub is a development platform to host and review code, manage
            projects, and build software.
            {"\n\n"}
            For more information on what data GitHub, Inc and GithHub collect
            for what purpose and how the protection of the data is ensured,
            please visit GitHub Privacy Policy page:
            {"\n\n"}
            <Text
              style={{ color: "blue" }}
              onPress={() =>
                Linking.openURL(
                  "https://help.github.com/en/github/site-policy/github-privacy-statement"
                )
              }
            >
              https://help.github.com/en/github/site-policy/github-privacy-statement
            </Text>
          </Text>
          <H2>8. Children's Privacy</H2>
          <Text className="text-light-grey mt-4">
            Our services are not intended for use by children under 13 years of
            age. We do not knowingly collect personal information from children
            under 13.
          </Text>
          <H2>9. Links to Other Sites</H2>
          <Text className="text-light-grey mt-4">
            Our Service may contain links to other sites that are not operated
            by us. If you click a third party link, you will be directed to that
            third party's site. We strongly advise you to review the Privacy
            Policy of every site you visit.{"\n\n"}
            We have no control over and assume no responsibility for the
            content, privacy policies or practices of any third party sites or
            services.
          </Text>
          <H2>10. Changes to This Privacy Policy</H2>
          <Text className="text-light-grey mt-4">
            We may update this Privacy Policy from time to time to reflect
            changes in our practices or for other operational, legal, or
            regulatory reasons. We will notify you of any material changes by
            posting the updated policy on our website or through our app
          </Text>
          <H2>11. Contact Us</H2>
          <Text className="text-light-grey mt-4">
            If you have any questions about this Privacy Policy, please contact
            us at
            <Text
              style={{ color: "blue" }}
              onPress={() =>
                Linking.openURL("mailto:fortunealebiosu710@gmail.com")
              }
            >
              {" "}
              fortunealebiosu710@gmail.com
            </Text>
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};

export default Privacy;
