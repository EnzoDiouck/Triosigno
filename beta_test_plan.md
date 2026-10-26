# 📘 Beta Test Plan – Trio-Signo
## 🚀 Cover Page
**Project:** Trio-Signo<br>
**Title:** Beta Test Plan<br>
**Context:** EIP – 4th year<br>
**Date:** April 25th 2025

## 1. 🎯 Introduction & Objectives
### 1.1 Context
Trio-Signo is an interactive application for learning French Sign Language (LSF), inspired by Duolingo. It features interactive exercises, gesture recognition via camera, and comprehension tests.
### 1.2 Beta Test Objectives
- Identify bugs and issues before the official release
- Collect feedback on the interface and user experience
- Evaluate the gesture recognition system’s accuracy
- Test compatibility across various devices (Android, iOS, Web)
- Fine-tune gamification mechanisms to maximize engagement

## 2. 👥 Tester Profiles
### 2.1 Participation Criteria
- LSF learners (beginner and advanced)
- Deaf or hard-of-hearing individuals
- LSF teachers and trainers
- Users of language-learning applications
- Users on iOS, Android, tablets, PC
- Users not familiar with digital
### 2.2 Conditions
- Have a compatible device 
  - Runs one of the supported platforms: iOS, Android or Web browser
  - Has a working internet connection
  - Supports video playback and recording (camera)
  - Has sufficient storage to install the app and store temporary files
  - For users unfamiliar with tech: support from a relative or assistant is acceptable
  - Have sufficient hardware and software capabilities to run small AI models
- Commit to testing for at least 2 weeks
- Provide regular feedback via forms or messaging

## 3. ⚙️ Features to Test

- Registration and login. 
- User interface and navigation. 
- Interactive exercises (gesture recognition, quizzes, translation). 
- Camera-based gesture recognition. 
- Daily notifications and reminders. 
- Progress tracking and rewards system. 
- Compatibility with various devices and systems.

## 4. 💡 Test Scenarios

| Scenario | Tester Role | Feature Being Tested | Test Step | Expected result |
|---------:|:-----------:|:--------------------:|:----------|:---------------:|
| 1 | Beginner Learner | Sign-up and Login | Open app → Create account → Log in | Account created and redirected to home screen |
| 2 | Deaf User | Navigation | Click each main menu → Go back → Navigate through the app | Smooth navigation without bugs or delays |
| 3 | All user profiles | Interactive Exercises (level 1-2) | Choose exercise → Respond → Validate | Correct feedback and progress saved |
| 4 | LSF Teacher | Gesture Recognition | Activate camera → Perform displayed sign → Validate | Correct recognition of gesture in at least 85% of cases |
| 5 | Experienced User | Notifications / Reminders | Wait for daily notification → Click it | Notification received and directed to home page |
| 6 | All user profiles | Gamification | Complete a module → Observe badge/XP attribution | Reward given and score updated |
| 7 | Tablet or Phone User | Multi-device Compatibility | Test on Android, iOS, tablet, browser | Proper UI adaptation without major bugs |
| 8 | User with low digital literacy | Sign-up, Navigation, UX | Open app → Attempt account creation without help → Navigate through main menus → Start a basic exercise | User can complete each step with minimal confusion. Interface is intuitive and guidance elements are effective.|


## 5. 🛠️ Tools and Platforms
- Bug Tracking: Github Project
- Contact: Email
- Feedback Collection: Google Forms

## 6. 📊 KPIs & Success Criteria

| Key Performance Indicator (KPI) | Target Threshold |
|:--------------------------------|:-----------------|
| Gesture recognition accuracy | >= 85% accuracy |
| App response time | < 1 seconds between action and result |
| Rate of critical bugs | < 5% of testers reporting blocking issues |
| Overall satisfaction | > 80% positive feedback |
| Tester retention rate (over 2 weeks) | > 70% |
| Recommendation likelihood | > 70% of testers would recommend the app |

## 7. 📆 Post-Test Action Plan
- Analyze feedback and fix critical bugs
- Integrate suggested improvements
- Optionally launch an open beta phase
- Plan the official release

**Planned beta test start date:** May 26th 2025<br>
**Estimated duration:** 2 to 4 weeks
