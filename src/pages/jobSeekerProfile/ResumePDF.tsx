import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Line } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        padding: 30,
        fontFamily: 'Helvetica',
    },
    section: {
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 5,
    },
    text: {
        fontSize: 12,
        marginBottom: 5,
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    separator: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginBottom: 10,
    },
});
const dummyData = {
    email: 'example@example.com',
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '123-456-7890',
    gender: 'Male',
    birthDate: '01/01/1990',
    country: 'United States',
    personalImage: 'https://via.placeholder.com/150',
    descriptionOrSummary: 'Experienced software developer with a passion for creating innovative solutions.',
    education: [
        {
            title: 'Bachelor of Science in Computer Science',
            startDate: '09/2010',
            endDate: '06/2014',
        },
        {
            title: 'Master of Science in Software Engineering',
            startDate: '09/2014',
            endDate: '06/2016',
        },
    ],
    workExperience: [
        {
            title: 'Software Engineer',
            startDate: '07/2016',
            endDate: 'Present',
        },
        {
            title: 'Web Developer',
            startDate: '01/2014',
            endDate: '06/2016',
        },
    ],
    skills: ['JavaScript', 'React', 'Node.js', 'HTML', 'CSS', 'SQL'],
};
const ResumePDF = ({props}: any) => {
    console.log('props ' , props)
    const { email, firstName, lastName, phoneNumber, gender, birthDate, country, personalImage, descriptionOrSummary, education, workExperience, skills } = props;
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.title}>{`${firstName} ${lastName}`}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            {email && <Text style={styles.subtitle}>Email: {email}</Text>}
                            {phoneNumber && <Text style={styles.subtitle}>Phone Number: {phoneNumber}</Text>}
                            {gender && <Text style={styles.subtitle}>Gender: {gender}</Text>}
                            {birthDate && <Text style={styles.subtitle}>Date of Birth: {birthDate}</Text>}
                            {country && <Text style={styles.subtitle}>Country: {country}</Text>}
                        </View>
                        {personalImage && <Image src={personalImage} style={styles.image} />}
                    </View>
                    <Line style={styles.separator} />
                </View>

                <View style={styles.section}>
                    <Text style={styles.title}>Summary</Text>
                    {descriptionOrSummary && <Text style={styles.text}>{descriptionOrSummary}</Text>}
                    <Line style={styles.separator} />
                </View>
                {
                    education &&
                    <View style={styles.section}>
                        <Text style={styles.title}>Education</Text>
                        {education.map((edu, index) => (
                            <View key={index} style={styles.section}>
                                <Text style={styles.subtitle}>{edu.title}</Text>
                                {edu.startDate && edu.endDate && <Text style={styles.text}>{`Start Date: ${edu.startDate}, End Date: ${edu.endDate}`}</Text>}
                            </View>
                        ))}
                        <Line style={styles.separator} />
                    </View>
                }
                {
                    workExperience &&
                    <View style={styles.section}>
                        <Text style={styles.title}>Work Experience</Text>
                        {workExperience.map((exp, index) => (
                            <View key={index} style={styles.section}>
                                <Text style={styles.subtitle}>{exp.title}</Text>
                                {exp.startDate && exp.endDate && <Text style={styles.text}>{`Start Date: ${exp.startDate}, End Date: ${exp.endDate}`}</Text>}
                            </View>
                        ))}
                        <Line style={styles.separator} />
                    </View>
                }
                {
                    skills &&
                    <View style={styles.section}>
                        <Text style={styles.title}>Skills</Text>
                        {skills.map((skill, index) => (
                            skill && <Text key={index} style={styles.text}>{skill}</Text>
                        ))}
                    </View>
                }
            </Page>
        </Document>
    );
};

export default ResumePDF;
