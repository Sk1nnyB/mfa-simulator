export const optionsMFA = [
  { name: 'Password',
    description: "Passwords are words, phrases, or combinations of random numbers, letters and symbols that can be used to 'authenticate' a user. They should only be known by \
                  the user, so do not share your passwords and always store them in a secure location.",
    why: 'Passwords are used due to their ability to be easily implemented in any piece of software or website. They are also easy for us, the user, to understand and use!',
    examples: 'Email accounts, social medias, bank accounts, computers',
    how: 'A user will first create their password, which will then be securely stored by the system. The next time the user attempts to log in, the user will re-enter their password. \
          If the password they enter matches the stored password, they can be logged in.',
    tips: 'Try to use a different password for each account you create. Then, if one password is leaked, all your other accounts will still be secure!',
    fun_fact: 'The first digital password was invented in 1961, but they have been around since Roman times.',
    wiki_link: 'https://en.wikipedia.org/wiki/Password',
    instructions: ['Create a password', 'Use your created password to log in!'],
    note: ' DO NOT put in your password that you use for real accounts'},
  // Security Questions
  { name: 'Security Questions',
    description: 'A security question is like a password, where it is a phrase that is used to authenticate a user, but it is usually also the answer to a question. This makes it easier \
                  for the user to remember.',
    why: 'When a password is forgotten, lost or otherwise needs to be reset, it can be helpful to still authenticate the user in a less secure way, to prevent malicious resetting or tampering. \
          Security questions are a good way of achieving this, as it also requires little to no effort on the part of the user to remember their answer. \
          It is also cost effective, a system that implements passwords can also easily implement these questions.',
    examples: 'Email accounts, social medias, bank accounts',
    how: 'A user will first answer one or many questions from a large question bank, which will then be securely stored by the system. The next time the user attempts to log in, the user will \
          be prompted with the question, re-entering their answer. If the answer they enter matches the stored answer, they can be logged in.',
    tips: 'Try not to tell anyone any information that relates to or could answer your security questions.',
    fun_fact: 'Since social media has become popular, security questions have become ineffective due to the rise in knowledge of personal information',
    wiki_link: 'https://en.wikipedia.org/wiki/Security_question',
    instructions: ['Choose and answer a security question', "Use your answer to 'answer' the question and log in"],
    note: ''},
  // Authentication App
  { name: 'Authentication App',
    description: 'An authentication app works by either providing the user with a one-time use code, which will expire after a set time, or providing a "push notification" that the user \
                  can either accept or decline.',
    why: "Like security questions, authentication apps can supplement a password, although usually it is used as well as a password, to strengthen the security of the system. This means that \
          even if someone has your password, they cannot log in as they will not have access to your codes. As codes are generated over and over, and are not specific codes, they cannot be guessed \
          or 'cracked' as easily.",
    examples: 'google authenticator, microsoft authenticator, duo mobile, steam',
    how: "An authentication app works by first linking to the account(s) you wish to use it with, such as a banking account. The system shares with the app a secret 'key' that can be used to generate codes \
          or notifications. These codes can then be input back into the system, which can be checked against it's own algorithms and key(s) to ensure it is a valid code for your account.",
    tips: 'Make sure to keep these apps on a device that you will not easily lose, such as as tablet or dedicated phone, if possible',
    fun_fact: "As of December 2024, TikTok is the world's most downloaded mobile application",
    wiki_link: 'https://en.wikipedia.org/wiki/Google_Authenticator',
    instructions: ['Click the approval button to confirm you are trying to log in'],
    note: ''},
  // Text (SMS) Code
  { name: 'Text (SMS) Code',
    description: 'Text (SMS) description. Not the texts I should really be studying.',
    why: '',
    examples: 'Dating websites, PayPal, Uber',
    how: '',
    tips: 'Always ensure that your phone number is up to date on all your accounts, especially when acquiring a new SIM card or when using an external number (such as a work number)',
    fun_fact: 'There are multiple Guinness World Records for texting, including blind texting, which Elliot Nicholls broke with a time of 45s',
    wiki_link: 'https://en.wikipedia.org/wiki/Multi-factor_authentication#Mobile_phone-based_authentication',
    instructions: ['Find the code that has been sent to you', 'Input the code'],
    note: ''},
  // Email Code
  { name: 'Email Code',
    description: 'Email description. Where my efemail representation at? ',
    why: '',
    examples: 'GitHub, Elfster, Canva',
    how: '',
    tips: 'If you cannot see a message in your inbox, refresh the website after waiting around 5 minutes or check other folders such as junk/spam',
    fun_fact: "The first email sent from space, in 1991, ended with 'Hasta la vista, baby,...we'll be back!'",
    wiki_link: 'https://en.wikipedia.org/wiki/Email',
    instructions: ['Find the code that has been emailed to you', 'Input the code'],
    note: ''},
  // Fingerprint Scanner
  { name: 'Fingerprint Scanner',
    description: "Fingerprint scanning is the usage of a user's fingerprint in order to 'authenticate' them. As each fingerprint is unique, even between twins, \
                  it is a reliable and powerful way of ensuring that the user is who they claim they are.",
    why: "Fingerprint scanning is used for many reasons; it is easy to input a fingerprint on a phone or scanner (it is just one press after all), fingerprints are also harder to \
          fake and cannot be guessed or 'cracked'. It is better for users too, as fingerprints cannot be forgotten!",
    examples: 'Phone and computer unlock screens, buildings, law enforcement and military',
    how: "Firstly, a scanner (optical, capacitive, ultrasonic, or thermal) will take a reading of the user's fingerprint and convert it into a digital format. \
          Next, it will store this scanned fingerprint in a secure location, just like a password! The next time the user presses their finger on the scanner, \
          it can then scan and convert the finger again, comparing it to the stored print. If there is enough of a match, the user will be allowed access!",
    tips: 'It can often help to have multiple fingers on file, if you have it enabled on your phone then both index fingers and thumbs would be a good place to start.',
    fun_fact: 'Koalas have fingerprints too, so could also use these systems!',
    wiki_link: 'https://en.wikipedia.org/wiki/Fingerprint_scanner',
    instructions: ["Press your 'finger' (cursor) on the scanner", 'Wait for it to complete the scan'],
    note: ''},
  // Smart Card
  { name: 'Smart Card',
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
    note: ''},
  // Voice Recognition
  { name: 'Voice Recognition',
    description: "Voice recognition is method of authenticating a user by their voice characteristics, like tone, pitch and cadence. It can also be used with \
                  a verbal 'password', to strengthen the certainty.",
    why: 'Voice recognition is useful for systems that have no physical inputs, like buttons or a screen or systems that need increased security. Just like a fingerprint, \
          a voice is something that is unable to be lost or forgotten and cannot be easily mimicked (although with AI this increasingly becoming untrue).',
    examples: 'Smart home speakers, AI assistants, bank phone verification',
    how: "First, the system will capture a sample(s) of the user's voice through a microphone or recording and convert it to a digital format. Then, when a user tries to log in, \
          they will have a sample recaptured by the system. This sample is then compared to the original, focusing on components such as tone, frequency and cadence. If there is a \
          sufficient match between samples, and sometimes between sample content, then the user will be logged in!",
    tips: 'Speak slowly and clearly so that the device can pick up each word. If background noise is being picked up, move to a quieter environment.',
    fun_fact: "Microsoft's voice assistant, Cortana, was named after a fictional AI assistant from Halo",
    wiki_link: 'https://en.wikipedia.org/wiki/Speaker_recognition',
    instructions: ["Press the button and then say the voice phrase: 'this is a voice phrase'", 'If you are having problems with the voice recognition, type it in instead.'],
    note: 'If you are on firefox/safari/mobile then this may not be accessible at the moment.'},
];