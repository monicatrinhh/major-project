// info about item in the store including prices and description
let itemPurchase = {
    0: {
        name: "Blue Period",
        price: [25, 150, 100],
        description: "Modern house set for elegant connoisseur",
    },
    1: {
        name: "Bug Net",
        price: [3, 20, 10],
        description: "Bug net is full of holes after 5 usages, \n purchase a new one when needed",
    },
    2: {
        name: "Fishing Rod",
        price: [2, 20, 10],
        description: "Fishing rod breaks after 5 usages,\n purchase a new one when needed",
    },
    3: {
        name: "House",
        price: [18, 100, 70],
        description: "Upgrade your tent to a beautiful house",
    },
    4: {
        name: "Jane Eyre",
        price: [20, 80, 60],
        description: "Mystic antique house set for vintage lover",
    },

    5: {
        name: "Mansion",
        price: [35, 200, 100],
        description: "Level up your taste to an exquisite mansion",
    },

    6: {
        name: "Emma",
        price: [30, 170, 130],
        description: "Extravagant house set for the elevated elites",
    },
    7: {
        name: "Argyle Tiles",
        price: [10, 30, 30],
        description: "Sophisticated flooring pattern to \n brighten your house",
    },

    8: {
        name: "Veneer Tiles",
        price: [10, 30, 30],
        description: "Minimalistic flooring to soothe your senses",
    },

    9: {
        name: "HoneyComb",
        price: [20, 30, 30],
        description: "Dreamy flooring makes your house more unique",
    },


}

let nameDialouge = {
    0: "Welcome to Animal Crossing",
    1: "This wonderful place was created by the amazing Monica so \n if you like this game please praise her, \n she will gladly accept them",
    2: "Anyways, I don't have a name yet \n What name do you think would suit me?",
    3: "That's lovely, I think... ",
    4: "Nonetheless, I hope we will have a \n wonderful time together",
    5: 'Your first task is to find a place \n for your tent and pay off \n the loan for it to Tom Nook',
    6: 'When you find a place for \n your tent, press "P" to place it \n pay off the loan to start using the shop',
    7: 'Click on me to access the available functions', 
    8: "Alright, that's it! \n Let's Get Started! ",
}

let villagersData = {
    0: {
        name: 'Blathers',
        dialouge: {
            default: {
                0: "Oh! I've been waiting for you, ",
                1: "It's always a pleasure to have a chance \n to talk to you lovely young folks",
                2: "You guys teach me wonder,... \n so don't hesitate to talk to me anytimes",
                3: "But since you're here, seems like I can do something for you \n What can this old man lend a hand on?",
            },
            chatting: {
                0: "Oh my, it's lovely that you are willing to chat with me",
                1: "Not many people like hearing my thoughts lately",
                2: "I've been doing this experiment on \n how to extract a special liquid \n from the bug for medicines",
                3: "Everyone tells me that is a \n big waste of time, but I \n don't think so though,...",
                4: "Anyways, I was really grateful for \n your support when you gave me the bugs ",
                5: "But look at my manner here \n You let this old man ramble on again \n That's sweet of you, but let's talk about you too!"
            },
            question: {
                0: "What is your favourite animal?",
                1: "What is your favourite book?",
                2: "Do you like sitting near the window when it's rain?",
            },
            answer: {
                0: "You sure have an interesting pick! \n I love inspecting insects more than anything. \n Those little crawlies are all wonderfully peculiar fellows",
                1: "I am not suprised! You seem like \n an intellectual fellow \n My current favourite is Crime and Punishment \n by Dostoyevsky",
                2: "Ah, for me, drinking a warm cup of coffee \n in my room full of the smell of books \n is the best feeling",
            },
        },
        function: {
            0: "A: Trade F/B",
            1: 'B: Give out\n advices'
        },
        trade: {
            0: "Alright then, today exchange rate is:",
            1: "Please enter the number of Fish/Bug you \n would like to trade, hit Esc if you don't want to\n When done, hit Enter",
        },
    },
    1: {
        name: "Isabelle",
        dialouge: {
            default: {
                0: "Oh! Here you are already, ",
                1: "At this counter, I can help you with both general issues\n and issues you may face with other residents.",
                2: "We can delve into the details when specific concerns arise.\n No need to worry about that right now!",
                3: "But since you're here, I may as well ask... \n Do you have any specific concerns at the moment?",
            },
            chatting: {
                0: "Yip Yip, you know that I love chatting with you, \n don't you?",
                1: "I've been finishing the paperworks for the mayor, so \nI don't have much time to mess around lately",
                2: "Haizz... I know what you're thinking \n I am overworking myself again,\n but what can I say?",
                3: "I love helping people \n It makes me feel fuzzy in my woofy tummy",
                4: "But I would love to have some time off \n to visit the neighboring islands too!",
                5: "Yip Yip, enough about me \n It's not a conversation if I keep yappy yap"
            },
            question: {
                0: "What is your favourite animal?",
                1: "What is your favourite book?",
                2: "Do you like sitting near the window when it's rain?",
            },
            answer: {
                0: "Yip Yip, don't you think dogs are lovely though? \n Our tails are fluffy fluff and we are so fun to play with!",
                1: "Woahh! That's sound like an interesting book \n Mine current favourite is Charlotte's Web!",
                2: "For me, I don't like rain that much though \n Going in the sun is so much more wonderful!",
            },
        },
        function: {
            0: 'A: Ask for info',
            1: 'B: Chat with her',
        },
        instruct: {
            0: "Alright, down here is a list of things \n that you can do in our village",
            1: "This world is run on real time\n The ocean, your home space changes their color based on \n the time of the day",
            2: 'Some fish/bug only appear from 4-9pm, \n the shop open from 8AM to midnight',
            3: 'Each villager has an unique ability \n talk to them to find out',
            4: 'The trees might spawn coins if you press on it, \n try your luck!',
            5: 'Every things double at noon, \n be sure to log in at that time to maximize \n your items collecting',
            6: 'To delete data or adjust the music, go to settings',
            7: 'Trading rate for fish and bug is \ndifferent everytime you log in',
            8: 'If you start talking to villagers and suddenly esc out, the villagers \n will get angry deduct 1 friendship pts from you, \n if you use one of their ability, \n they will award pts as they see fits!',
            9: 'I hope you have a wonderful time \n at Animal Crossing',
        },

    },
    2: {
        name: "KK Slider",
        dialouge: {
            default: {
                0: "Oh! Looky here, \n oh boy has it been a while, ",
                1: "You and your busy schedule must have swallowed you whole,\n or else how could you have not spare time to talk with me?",
                2: "Sshh, I know it all, don't worry\n You know that we will always be best buds",
                3: "I'm so excited for today's bonding time now! \n What shall we do, you think?",
            },
            chatting: {
                0: "Let's go, best bud! I know that \n you miss talking to me!",
                1: "I've been writing a new song \n to win back my girlfriend",
                2: "She broke up with me since \n I use her last piece of bone \n to make an instrument",
                3: "Haizz... let's just say that I didn't suceed \n so she wants to take a break",
                4: "Anyways, you're the only one I'm telling \n so you should keep this a secret",
                5: "Now, best buddy exchange secrets, right? \n Let me ask you something too"
            },
            question: {
                0: "What is your favourite animal?",
                1: "What is your favourite book?",
                2: "Do you like sitting near the window when it's rain?",
            },
            answer: {
                0: "Ah Hah! I know it already \n We are best buddy after all!",
                1: "Hmph...I thought you like chewing on books like me \n not actually reading them...",
                2: "It is so romantic to sing in the rain \n in fact, my old girlfriend fall for me because \n I sing Elton John to her",
            },
        },
        function: {
            0: "A: Play music",
            1: "B: Chat with him",
        },
        music: {
            0: 'Alrighty, KK is at your service. \n Looks like it is time for me to show \n off my skill',
            1: 'You know, back in the day, \n I use to be pretty popular with the ladies \n because of my splendid finger techinique',
            2: 'Guitar-fingering, of course hahaha',
            3: 'Anyways, would you like to choose your own song \n or let me play my own?',
        }

    },
    3: {
        name: "Tom Nook",
        dialouge: {
            default: {
                0: "Look's who's here \n ain't it my favourite villager, ",
                1: "I am gladly to be at your service\n as long as you remain my patron, that is...",
                2: "Anyways, there is lots I can do for you, \n if you are willing to pay the price required",
                3: "Alright, now tell me, \n what brings you here?",
            },

            chatting: {
                0: "Pew pew, what a suprise! \n I would love to please my customer of course",
                1: "I've been wanting to expand my business oversea \n but the stinky fox in the neighbor island \n keep getting in my way",
                2: "There is just this huge market to \n be a shark loan right now...",
                3: "Just wait and see \n I will find way to dispose... I mean... \n compete with him",
                4: "You look like a smart person with reason \n to forget what I just said, right?",
                5: "That's what I thought! Not \n to divert your attention or anything, \n but let me ask you something too!",
            },
            question: {
                0: "What is your favourite activity?",
                1: "What is your favourite book?",
                2: "Do you like sitting near the window when it's rain?",
            },
            answer: {
                0: "I never imagine you would say that! \n You are indeed an interesting villager~",
                1: "Ah, then let me import that book for you \n If you like it, I think \n it will sell well!",
                2: "I don't have any preference, really... \n But rainy days sure are bad for business!",
            },
        },
        function: {
            0: "A: Buy items",
            1: 'B: Chat With Him',
        },
        item: {
            0: 10,
            1: 15,
            2: 20,
            3: 10,
            4: 20,
            5: 50,
        }
    },
    4: {
        name: "Marshal",
        dialouge: {
            default: {
                0: "Well, hello there! Bet you didn't expect to meet \n someone like me in a place \n like this, ",
                1: "So, tell me, \n what's going on, sulky?",
                2: "I'm not the best at comforting but I'm \n decent of giving out brutally honest advices",
                3: "so don't frown, your face is not that good already... \n Do you want to talk to me then?",
            },
            chatting: {
                0: "I mean... if you insist..",
                1: "My luck is the worst lately \n I've been trying to gather all of \n the newst collection of the \n 'Hazel Nuts War: Final Match' edtion",
                2: "When I was standing in line, \n there this huge Ox dummy who keep pushing me out \n of my line",
                3: "When I finally got in the store \n It sold OUT! It is just horrid...",
                4: 'Nothing good comes to actually good \n people like me, you know?',
                5: "I know you don't like hearing my rant! \nHpmh! That's fine. I can ask you questions too, I guess...",
            },
            question: {
                0: "What is your favourite animal?",
                1: "What is your favourite fruit?",
                2: "Do you like watching movies with popcorn?",
            },
            answer: {
                0: "Hpm...We don't have the same pick I guess \n now I'm more sulky...",
                1: "Nice! You have good taste, \n just like me!",
                2: "Okay, you are allow to invite me to movies next time then! \n Don't forget, sulky!",
            },
        },

    },
}

