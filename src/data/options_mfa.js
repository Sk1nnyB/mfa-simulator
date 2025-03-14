// import placeholder from './images/placeholder.jpg';
import authenticators from './images/authenticators.jpg';
import password from './images/password.jpg';
import authentication_app from './images/authentication_app.jpg';
import text from './images/text.jpg';
import voice from './images/voice.jpg';
import security_questions from './images/security_questions.jpg';
import smart_card from './images/smart_card_photo.jpg';
import fingerprint from './images/fingerprint.jpg';
import email from './images/email.jpg';

export const optionsMFA = [
  // Authenticators
  { name: 'Authentication and Authenticators',
    description: "Authentication is the method by which a secure system, such as a computer, application or database, can verify your access rights to its resources. \
                  A system normally does this through the use of authentication methods, for example and most commonly a password. \
                  A multi-factor authenticator is simply a combination of multiple of these authenticators, such as using both a password and a text code.",
    why: "Originally, just one method of authentication was used, as this was secure enough to ensure that the owners of the system knew your identify. \
          However, as methods of attacking these systems developed and grew more complex, 2FA was implemented; 2FA is the practice of using 2 authentication methods to \
          determine the validity of a user. Finally, multi-factor authentication was naturally developed, utilizing a wide array of methods shown below but also often more than 2 methods entirely.",
    examples: 'Knowledge - something you know (Password, Security Question); Possession - something you own (Authentication App, Text, Email, Smart Card); Biometric - something you are (Voice, Fingerprint)',
    how: 'Each authenticator works in a different way! To find out how, simply click or tap on the authentication method you would like to find out more about.',
    tips: 'When dealing with your own authentication methods, it is important to not cut corners or use unsafe practices, especially with more important accounts like banking or government websites.',
    fun_fact: 'This website was created by a student from the University of Manchester in 2024/5 as part of their dissertation!',
    wiki_link: 'https://en.wikipedia.org/wiki/Multi-factor_authentication',
    image: authenticators},
  // Password
  { name: 'Password',
    firebase_name: 'password',
    description: "Passwords are words, phrases, or combinations of random numbers, letters and symbols that can be used to prove your identify. They should only be known by \
                  you, so do not share your passwords and always store them in a secure location.",
    why: 'Passwords are used due to their ability to be easily implemented in any piece of software or website. They are also easy for us, to understand and use!',
    examples: 'Email accounts, social medias, bank accounts, computers',
    how: 'You will first create your password, which will then be securely stored by the system, often in an encrypted format. The next time you attempt to log in, you will re-enter your password. \
            If the password you enter matches the stored password, you can be logged in.',
    tips: 'Try to use a different password for each account you create. Then, if one of your passwords is leaked, all your other accounts will still be secure! Examples of leaks can include \
           losing devices on which these passwords are stored, a database breach and an over the shoulder attack. Make sure to change your passwords whenever you believe one has been leaked.',
    fun_fact: 'The first digital password was invented in 1961, but they have been around since Roman times.',
    wiki_link: 'https://en.wikipedia.org/wiki/Password',
    instructions: ['Create a strong password by changing all lights to green.', 'Use your created password to log in! You may need to scroll down. You do not need to enter your own username.'],
    secure: 'A good password needs a wide variety of symbols, letters and numbers to prevent against brute force attacks. A brute force attack is when someone attempts to guess a \
            password by randomly generating sequences of symbols until they find the matching one. They may also use a dictionary of common words to supplement this. \
            By increasing the number of symbols, you increase the amount of possible combinations they have to check, potentially making it unfeasible to crack entirely!\
            This is also why passwords should be longer than 8 symbols, but no longer than 14 as this can make them harder to remember.',
    note: ' DO NOT put in your password that you use for real accounts!',
    image: password},
  // Security Questions
  { name: 'Security Questions',
    firebase_name: 'security_questions',
    description: 'A security question is like a password, in that it is remembered knowledge, usually in the form of an answer to a question as opposed to a meaningful string of letters \
                  This makes it easier to remember than a password, as it is based on your knowledge of yourself rather than pure memory.',
    why: 'When a password is forgotten or lost and you request a new password or reset, it can be helpful to still authenticate you but in a less secure way, to prevent malicious resetting or tampering. \
            Security questions are a good way of achieving this, as it requires little to no effort to remember your answer. It is also cost effective, a system that implements passwords can easily implement these questions.',
    examples: 'Email accounts, social medias, bank accounts',
    how: 'You will first answer one or more questions of your choice from a large question bank, which will then be securely stored by the system. The next time you attempt to log in, you will \
            be prompted with your chosen question and re-enter your answer. If the answer you enter matches the stored answer, you will be logged in.',
    tips: 'Try not to tell anyone any information that relates to or could answer your security questions.',
    fun_fact: 'Since social media has become popular, security questions have become ineffective due to the rise in knowledge of personal information.',
    wiki_link: 'https://en.wikipedia.org/wiki/Security_question',
    instructions: ['Choose and answer a security question', "Use your answer to 'answer' the question and log in. You may need to scroll down."],
    note: '',
    image: security_questions},
  // Authentication App
  { name: 'Authentication App',
    firebase_name: 'authentication_app',
    description: 'An authentication app works by either providing you with a one-time use code or password, which will expire after a set time, or providing a "push notification" that you \
                  can either accept or decline.',
    why: "Authentication apps supplement a password, to strengthen the security of the system. This means that even if someone has your password, they cannot log in \
            as they will not have access to your codes on your phone. As codes are generated over and over again, and are not specific, they cannot be guessed or 'cracked' as easily.",
    examples: 'google authenticator, microsoft authenticator, duo mobile, steam',
    how: "An authentication app works by first linking to the account(s) you wish to use it with, such as a banking account. The system shares with the app a secret 'key' that can be used to generate codes \
            or notifications. These codes can then be input back into the system, which can be checked against it's own algorithms and key(s) to ensure it is a valid code for your account.",
    tips: 'Make sure to keep these apps on a device that you will not easily lose, such as as tablet or dedicated phone, if possible.',
    fun_fact: "As of December 2024, TikTok is the world's most downloaded mobile application.",
    wiki_link: 'https://en.wikipedia.org/wiki/Google_Authenticator',
    instructions: ['Click the approval button to confirm you are trying to log in!'],
    note: '',
    image: authentication_app},
  // Text (SMS) Code
  { name: 'Text (SMS) Code',
    firebase_name: 'text_task',
    description: "A text (SMS) code is a randomly generated code that is sent to your phone, over text, when you try and log in. It often expires after a set amount of time, so keep your phone at hand when \
                  using this method of verification. They are secure but can still be subject to attacks, such as SIM swapping, where a SIM card is essentially copied and texts sent to you can also be sent to a duplicate phone.",
    why: "Text codes, are not only used to confirm your identity but also can be used to prevent 'bots' from signing up to systems. Malicious actors often create fake accounts, known as bots, \
          which can be used for harmful activities such as phishing or spreading propaganda. Text codes help prevent this, as it's hard for malicious actors to gain access to a large number of phone numbers quickly.",
    examples: 'Dating websites, PayPal, Uber',
    how: "Text systems are quite simple; once you attempt to log in, a code is generated and then sent to your registered phone. You will then enter this generated code, often before it \
            'expires' and if it matches the generated code, you will be logged in.",
    tips: 'Always ensure that your phone number is up to date on all your accounts, especially when acquiring a new SIM card or when using an external number (such as a work number).',
    fun_fact: 'There are multiple Guinness World Records for texting, including blind texting, which Elliot Nicholls broke with a time of 45s.',
    wiki_link: 'https://en.wikipedia.org/wiki/Multi-factor_authentication#Mobile_phone-based_authentication',
    instructions: ['Find the number code that has been sent to you. You may need to scroll down.', 'Input the code.'],
    note: '',
    image: text},
  // Email Code
  { name: 'Email Code',
    firebase_name: 'email_task',
    description: "An email code is a randomly generated code that is sent to your email address when you try to log in. It often expires after a set amount of time, so keep access to this at hand when \
                  using this method of verification. Email codes can also be used to verify other email addresses and have their own 2FAs, so it can help to have a 'backup' email to use for authentication and strengthen your 'chain'.",
    why: "Email is used in situations where a text code may be unreliable or unavailable, often favoured for access to 'temporary' emails that can be used to authenticate and then be abandoned.",
    examples: 'GitHub, Elfster, Canva',
    how: "Email systems work in the same way as text systems; once you attempt to log in, a code is generated and then sent to the your registered email. You will then enter this generated code, often before it \
            'expires' and if it matches the generated code, you will be logged in.",
    tips: 'If you cannot see a message in your inbox, refresh the website after waiting around 5 minutes or check other folders such as junk/spam.',
    fun_fact: "The first email sent from space, in 1991, ended with 'Hasta la vista, baby,...we'll be back!'",
    wiki_link: 'https://en.wikipedia.org/wiki/Email',
    instructions: ['Find the code that has been emailed to you.', 'Input the code.'],
    note: '',
    image: email},
  // Fingerprint Scanner
  { name: 'Fingerprint Scanner',
    firebase_name: 'fingerprint',
    description: "Fingerprint scanning is the use of a fingerprint in order to authenticate. As each fingerprint is unique, even between twins, it is a reliable and powerful way of ensuring your identity.",
    why: "Fingerprint scanning is used for many reasons; it is easy to input a fingerprint on a phone or scanner (it is just one press after all), fingerprints are also harder to \
          fake and cannot be guessed or 'cracked'. It is better for users too, as fingerprints cannot be forgotten!",
    examples: 'Phone and computer unlock screens, buildings, law enforcement and military',
    how: "Firstly, a scanner (optical, capacitive, ultrasonic, or thermal) will take a reading of your fingerprint and convert it into a digital format. \
            Next, it will store this scanned fingerprint in a secure location, just like a password! The next time you press your finger on the scanner, \
            it can then scan and convert the fingerprint again, comparing it to the stored print. If there is enough of a match, the user will be allowed access!",
    tips: 'It can often help to have multiple fingerprints on file, if you have it enabled on your phone then both index fingers and thumbs would be a good place to start.',
    fun_fact: 'Koalas have fingerprints too, so could also use these systems!',
    wiki_link: 'https://en.wikipedia.org/wiki/Fingerprint_scanner',
    instructions: ["Press your 'finger' (cursor) on the scanner.", 'Wait for it to complete the scan.'],
    note: '',
    image: fingerprint},
  // Smart Card
  { name: 'Smart Card',
    firebase_name: 'smart_card',
    description: "A smart card is usually a small, plastic card (about the size of a credit card) with a tiny embedded chip that can be used to identify you. \
                  It is typically 'tapped', 'swiped' or 'inserted' into a device that then reads the chips contents. Although they can't be forgotten like passwords, they \
                  can still be lost, so it is recommended to store them somewhere safe, like a phone or wallet.",
    why: "Smart cards are often used due to their convenient and portable nature, their ability to do multiple things (add funds, pay for items etc.) and their ease of use.",
    examples: 'Hotels, credit cards, transport cards (oyster card, bus passes), SIM cards',
    how: "Each smart card is embedded with a microchip, a little computer that can store data and run programs. Each card can 'communicate' with a reader \
            with contactless (NFC/RFID) or by insertion. This communication allows for the reader to identify the data on the card and perform operations on it, such as \
            identification by comparing their data with stored data on the card.",
    tips: 'Many thieves attempt to tap a reader against smart cards such as credit cards kept in wallets and pockets, so keeping them in an contactless-proof case is recommended.',
    fun_fact: 'The invention of the smart card was originally intended for gas stations.',
    wiki_link: 'https://en.wikipedia.org/wiki/Smart_card',
    instructions: ["Drag and hold the security card to the scanner.", 'Wait for it to complete the scan.'],
    note: '',
    image: smart_card},
  // Voice Recognition
  { name: 'Voice Recognition',
    firebase_name: 'voice',
    description: "Voice recognition is method of authenticating you by your voice characteristics, like tone, pitch and cadence. It can also be used with \
                  a verbal 'password', to strengthen the certainty.",
    why: 'Voice recognition is useful for systems that have no physical inputs, such as Siri or Alexa, or systems that need increased security. Just like a fingerprint, \
            a voice is something that is unable to be lost or forgotten and cannot be easily mimicked, although with AI this is quickly becoming false.',
    examples: 'Smart home speakers, AI assistants, bank phone verification',
    how: "First, the system will capture a sample(s) of your voice through a microphone or recording and convert it to a digital format. Then, when you try to log in, \
            they will recapture a sample of your voice. This sample is then compared to the original, focusing on components such as tone, frequency and cadence. If there is a \
            sufficient match between samples, and sometimes between sample content, then you will be logged in!",
    tips: 'Speak slowly and clearly so that the device can pick up each word. If background noise is being picked up, move to a quieter environment. Be careful of using voice methods \
            as bad actors can replicate your voice in the use of scams if they have enough samples.',
    fun_fact: "Microsoft's voice assistant, Cortana, was named after a fictional AI assistant from Halo.",
    wiki_link: 'https://en.wikipedia.org/wiki/Speaker_recognition',
    instructions: ["Press the button and then say the voice phrase: 'this is a voice phrase'.", "If you mess up, stop recording and try again!"],
    note: 'If you are on firefox/safari/mobile then this may not be accessible at the moment.',
    image: voice},
];