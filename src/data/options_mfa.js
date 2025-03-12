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
  { name: 'Authenticators',
    description: "Authenticators are methods of 'authenticating' a user, which is essentially making sure a user is who they say they are. A multi-factor authenticator is simply a combination of multiple authenticators.",
    why: "Authenticators are used to ensure the security of a user's data, account or other sensitive information.",
    examples: 'Knowledge - something the user knows (Password, Security Question); Possession - something the user owns (Authentication App, Text, Email, Smart Card); Biometric - something the user is (Voice, Fingerprint)',
    how: 'Each authenticator works in a different way! To find out how, simply click or tap on the authentication method you would like to find out more about.',
    tips: 'When dealing with authentication methods, it is important to not cut corners or use unsafe practices, especially with important accounts like banking or government websites.',
    fun_fact: 'This website was created by a student from the University of Manchester in 2024/5 as part of their dissertation!',
    wiki_link: 'https://en.wikipedia.org/wiki/Multi-factor_authentication',
    image: authenticators},
  // Password
  { name: 'Password',
    firebase_name: 'password',
    description: "Passwords are words, phrases, or combinations of random numbers, letters and symbols that can be used to 'authenticate' a user. They should only be known by \
                  the user, so do not share your passwords and always store them in a secure location.",
    why: 'Passwords are used due to their ability to be easily implemented in any piece of software or website. They are also easy for us, the user, to understand and use!',
    examples: 'Email accounts, social medias, bank accounts, computers',
    how: 'A user will first create their password, which will then be securely stored by the system. The next time the user attempts to log in, the user will re-enter their password. \
            If the password they enter matches the stored password, they can be logged in.',
    tips: 'Try to use a different password for each account you create. Then, if one password is leaked, all your other accounts will still be secure!',
    fun_fact: 'The first digital password was invented in 1961, but they have been around since Roman times.',
    wiki_link: 'https://en.wikipedia.org/wiki/Password',
    instructions: ['Create a strong password by changing all lights to green.', 'Use your created password to log in! You may need to scroll down on the step 1 task.'],
    secure: 'A good password needs a wide variety of symbols, letters and numbers to prevent against brute force attacks. A brute force attack is when someone attempts to guess a \
            password by randomly generating sequences of symbols until they find the matching one. By increasing the number of symbols, you increase the amount of possible combinations.\
            This is also why passwords should be longer than 8 symbols, but no longer than 14 as this can make them harder to remember.',
    note: ' DO NOT put in your password that you use for real accounts',
    image: password},
  // Security Questions
  { name: 'Security Questions',
    firebase_name: 'security_questions',
    description: 'A security question is like a password, in that it is a phrase used to authenticate a user, usually in the form of an answer to a question. This makes it easier \
                  for the user to remember than a password, as it is based on your knowledge of yourself rather than pure memory.',
    why: 'When a password is forgotten, lost or otherwise needs to be reset, it can be helpful to still authenticate the user in a less secure way, to prevent malicious resetting or tampering. \
            Security questions are a good way of achieving this, as it requires little to no effort on the part of the user to remember their answer. \
            It is also cost effective, a system that implements passwords can easily implement these questions.',
    examples: 'Email accounts, social medias, bank accounts',
    how: 'A user will first answer one or more questions from a large question bank, which will then be securely stored by the system. The next time the user attempts to log in, the user will \
            be prompted with the question, re-entering their answer. If the answer they enter matches the stored answer, they will be logged in.',
    tips: 'Try not to tell anyone any information that relates to or could answer your security questions.',
    fun_fact: 'Since social media has become popular, security questions have become ineffective due to the rise in knowledge of personal information',
    wiki_link: 'https://en.wikipedia.org/wiki/Security_question',
    instructions: ['Choose and answer a security question', "Use your answer to 'answer' the question and log in. You may need to scroll down."],
    note: '',
    image: security_questions},
  // Authentication App
  { name: 'Authentication App',
    firebase_name: 'authentication_app',
    description: 'An authentication app works by either providing the user with a one-time use code, which will expire after a set time, or providing a "push notification" that the user \
                  can either accept or decline.',
    why: "Authentication apps supplement a password, to strengthen the security of the system. This means that even if someone has your password, they cannot log in \
            as they will not have access to your codes. As codes are generated over and over again, and are not specific, they cannot be guessed or 'cracked' as easily.",
    examples: 'google authenticator, microsoft authenticator, duo mobile, steam',
    how: "An authentication app works by first linking to the account(s) you wish to use it with, such as a banking account. The system shares with the app a secret 'key' that can be used to generate codes \
            or notifications. These codes can then be input back into the system, which can be checked against it's own algorithms and key(s) to ensure it is a valid code for your account.",
    tips: 'Make sure to keep these apps on a device that you will not easily lose, such as as tablet or dedicated phone, if possible',
    fun_fact: "As of December 2024, TikTok is the world's most downloaded mobile application",
    wiki_link: 'https://en.wikipedia.org/wiki/Google_Authenticator',
    instructions: ['Click the approval button to confirm you are trying to log in'],
    note: '',
    image: authentication_app},
  // Text (SMS) Code
  { name: 'Text (SMS) Code',
    firebase_name: 'text_task',
    description: "A Text (SMS) Code is a randomly generated code that is sent to a user's phone when they try and log in. It often expires after a set amount of time, so keep your phone at hand when \
                  using this method of verification.",
    why: "Text codes, are not only used to confirm the user's identity (through something they own) but also can be used to prevent bots from signing up. Bad actors will often try and create these fake \
            'bot' accounts, that can then be used for malicious purposes and text codes prevent this as it is hard to have easy access to large amounts of phone numbers. ",
    examples: 'Dating websites, PayPal, Uber',
    how: "Text systems are quite simple; once the user attempts a log in, a code is generated and then sent to the user's registered phone. The user will then enter this generated code, often before it \
            'expires' and if it matches the generated code, they will be logged in.",
    tips: 'Always ensure that your phone number is up to date on all your accounts, especially when acquiring a new SIM card or when using an external number (such as a work number)',
    fun_fact: 'There are multiple Guinness World Records for texting, including blind texting, which Elliot Nicholls broke with a time of 45s',
    wiki_link: 'https://en.wikipedia.org/wiki/Multi-factor_authentication#Mobile_phone-based_authentication',
    instructions: ['Find the number code that has been sent to you. You may need to scroll down.', 'Input the code'],
    note: '',
    image: text},
  // Email Code
  { name: 'Email Code',
    firebase_name: 'email_task',
    description: "An Email Code is a randomly generated code that is sent to a user's email address when they try to log in. It often expires after a set amount of time, so keep access to this at hand when \
                  using this method of verification. Email codes can also be used to verify other email addresses, so it can help to have a 'backup' email to use for authentication.",
    why: "Email is used in situations where a text code may be unreliable or unavailable, often favoured for access to 'temporary' emails that can be used to authenticate and then be abandoned.",
    examples: 'GitHub, Elfster, Canva',
    how: "Email systems work in the same way as text systems; once the user attempts a log in, a code is generated and then sent to the user's registered email. The user will then enter this generated code, often before it \
            'expires' and if it matches the generated code, they will be logged in.",
    tips: 'If you cannot see a message in your inbox, refresh the website after waiting around 5 minutes or check other folders such as junk/spam',
    fun_fact: "The first email sent from space, in 1991, ended with 'Hasta la vista, baby,...we'll be back!'",
    wiki_link: 'https://en.wikipedia.org/wiki/Email',
    instructions: ['Find the code that has been emailed to you', 'Input the code'],
    note: '',
    image: email},
  // Fingerprint Scanner
  { name: 'Fingerprint Scanner',
    firebase_name: 'fingerprint',
    description: "Fingerprint scanning is the use of a fingerprint in order to authenticate a user. As each fingerprint is unique, even between twins, it is a reliable and powerful \
                  way of ensuring that the user is who they claim they are.",
    why: "Fingerprint scanning is used for many reasons; it is easy to input a fingerprint on a phone or scanner (it is just one press after all), fingerprints are also harder to \
          fake and cannot be guessed or 'cracked'. It is better for users too, as fingerprints cannot be forgotten!",
    examples: 'Phone and computer unlock screens, buildings, law enforcement and military',
    how: "Firstly, a scanner (optical, capacitive, ultrasonic, or thermal) will take a reading of the user's fingerprint and convert it into a digital format. \
            Next, it will store this scanned fingerprint in a secure location, just like a password! The next time the user presses their finger on the scanner, \
            it can then scan and convert the fingerprint again, comparing it to the stored print. If there is enough of a match, the user will be allowed access!",
    tips: 'It can often help to have multiple fingers on file, if you have it enabled on your phone then both index fingers and thumbs would be a good place to start.',
    fun_fact: 'Koalas have fingerprints too, so could also use these systems!',
    wiki_link: 'https://en.wikipedia.org/wiki/Fingerprint_scanner',
    instructions: ["Press your 'finger' (cursor) on the scanner", 'Wait for it to complete the scan'],
    note: '',
    image: fingerprint},
  // Smart Card
  { name: 'Smart Card',
    firebase_name: 'smart_card',
    description: "A smart card is usually a small, plastic card (about the size of a credit card) with a tiny embedded chip that can be used to identify a user. \
                  It is typically 'tapped', 'swiped' or 'inserted' into a device that then reads it's contents. Although they can't be forgotten like passwords, they \
                  can still be lost, so it is recommended to store them somewhere safe, like a phone or wallet.",
    why: "Smart cards are often used due to their convenient and portable nature, their ability to do multiple things (add funds, pay for items etc.) and their \
            ease of use.",
    examples: 'Hotels, credit cards, transport cards (oyster card, bus passes), SIM cards',
    how: "Each smart card is embedded with a microchip, a little computer that can store data and run programs. Each card can 'communicate' with a reader \
            with contactless (NFC/RFID) or by insertion. This communication allows for the reader to identify the data on the card and perform operations on it, such as \
            identification of the user by comparing their data with already stored data.",
    tips: 'Many thieves attempt to tap a reader against smart cards kept in wallets and pockets, so keeping them in an contactless-proof case is recommended.',
    fun_fact: 'The invention of the smart card was originally intended for gas stations',
    wiki_link: 'https://en.wikipedia.org/wiki/Smart_card',
    instructions: ["Drag and hold the security card to the scanner", 'Wait for it to complete the scan'],
    note: '',
    image: smart_card},
  // Voice Recognition
  { name: 'Voice Recognition',
    firebase_name: 'voice',
    description: "Voice recognition is method of authenticating a user by their voice characteristics, like tone, pitch and cadence. It can also be used with \
                  a verbal 'password', to strengthen the certainty.",
    why: 'Voice recognition is useful for systems that have no physical inputs, like buttons or a screen or systems that need increased security. Just like a fingerprint, \
            a voice is something that is unable to be lost or forgotten and cannot be easily mimicked, although with AI this increasingly becoming untrue.',
    examples: 'Smart home speakers, AI assistants, bank phone verification',
    how: "First, the system will capture a sample(s) of the user's voice through a microphone or recording and convert it to a digital format. Then, when a user tries to log in, \
            they will have a sample recaptured by the system. This sample is then compared to the original, focusing on components such as tone, frequency and cadence. If there is a \
            sufficient match between samples, and sometimes between sample content, then the user will be logged in!",
    tips: 'Speak slowly and clearly so that the device can pick up each word. If background noise is being picked up, move to a quieter environment. Be careful of using voice methods \
            as bad actors can replicate your voice in the use of scams if they have enough samples.',
    fun_fact: "Microsoft's voice assistant, Cortana, was named after a fictional AI assistant from Halo",
    wiki_link: 'https://en.wikipedia.org/wiki/Speaker_recognition',
    instructions: ["Press the button and then say the voice phrase: 'this is a voice phrase'", 'If you are having problems with the voice recognition, skip this instead.'],
    note: 'If you are on firefox/safari/mobile then this may not be accessible at the moment.',
    image: voice},
];