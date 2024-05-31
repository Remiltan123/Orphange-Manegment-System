import p1_img from './child 1.png'
import p2_img from './child 2.png'
import p3_img from './child 3.png'
import p4_img from './child 4.png'
import p5_img from './child 5.png'
import p6_img from './child 6.png'

let childs_data = [
  {
    orphanageName: "Kaje House",
    children: [
      {
        id: 1,
        name: "Kaje",
        age: 7,
        gender: "Male",
        sport: "Soccer",
        education: "Primary School",
        extra_activity: "Drawing",
        image: p1_img,
        medical_conditions: ["Asthma"],
        favorite_food: "Pizza",
        languages_spoken: ["English", "Spanish"],
        hobbies: ["Reading", "Playing video games"]
      },
      {
        id: 2,
        name: "Kalai",
        age: 8,
        gender: "Female",
        sport: "Basketball",
        education: "Primary School",
        extra_activity: "Chess",
        image: p2_img,
        medical_conditions: ["None"],
        favorite_food: "Pasta",
        languages_spoken: ["English"],
        hobbies: ["Painting", "Singing"]
      },
      {
        id: 3,
        name: "Kaje",
        age: 7,
        gender: "Male",
        sport: "Soccer",
        education: "Primary School",
        extra_activity: "Drawing",
        image: p1_img,
        allergies: ["Peanuts"],
        favorite_food: "Pizza",
        languages_spoken: ["English", "Spanish"],
        hobbies: ["Reading", "Playing video games"]
      },
      {
        id: 4,
        name: "Kalai",
        age: 8,
        gender: "Female",
        sport: "Basketball",
        education: "Primary School",
        extra_activity: "Chess",
        image: p4_img,
        medical_conditions: ["None"],
        favorite_food: "Pasta",
        languages_spoken: ["English"],
        hobbies: ["Painting", "Singing"]
      },
      {
        id: 5,
        name: "Kalai",
        age: 8,
        gender: "Female",
        sport: "Basketball",
        education: "Primary School",
        extra_activity: "Chess",
        image: p5_img,
        medical_conditions: ["None"],
        favorite_food: "Pasta",
        languages_spoken: ["English"],
        hobbies: ["Painting", "Singing"]
      },
      {
        id: 6,
        name: "Kalai",
        age: 8,
        gender: "Female",
        sport: "Basketball",
        education: "Primary School",
        extra_activity: "Chess",
        image: p6_img,
        medical_conditions: ["None"],
        favorite_food: "Pasta",
        languages_spoken: ["English"],
        hobbies: ["Painting", "Singing"]
      },
    ]
  },
  {
    orphanageName: "Rose House",
    children: [
      {
        id: 6,
        name: "Kunara",
        age: 9,
        gender: "Male",
        sport: "Swimming",
        education: "Middle School",
        extra_activity: "Gardening",
        image: p1_img,
        medical_conditions: ["None"],
        favorite_food: "Burgers",
        languages_spoken: ["English", "French"],
        hobbies: ["Playing guitar", "Cooking"]
      },
      {
        id: 7,
        name: "Kalai",
        age: 10,
        gender: "Female",
        sport: "Tennis",
        education: "Middle School",
        extra_activity: "Music",
        image: p4_img,
        medical_conditions: ["None"],
        favorite_food: "Sushi",
        languages_spoken: ["English", "Japanese"],
        hobbies: ["Dancing", "Watching movies"]
      },
      // Add more children here
    ]
  }
];

export default childs_data;
