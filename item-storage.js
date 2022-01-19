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
    7: "Alright, that's it! \n Let's Get Started! ",
}

let villagersData = {
    0: {
        name: 'Blathers',
        dialouge: {
            default: {
                0: "Oh! Here you are already, ",
                1: "At this counter, I can help you with both general issues\n and issues you may face with other residents.",
                2: "We can delve into the details when specific concerns arise.\n No need to worry about that right now!",
                3: "But since you're here, I may as well ask... \n Do you have any specific concerns at the moment?",
            },
            info: {

            },
            question: {
                0: "What is your profession?",
                2: "Do you ",
            }
        },
        function: {
            0: "A: Trade F/B",
            1: 'B: Give out\n advices'
        },
        trade: {
            0: "Alright then, today exchange rate is",
            1: "Please enter the number of Fish/Bug you \n would like to trade, hit esc if you don't want to\n When done, hit Enter",
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
            question: {
                0: {
                    question: 'What are your hobbies?',
                    answer: '',
                    keyCode: '49',
                },
                1: {
                    question: '',
                    answer: '',
                    keyCode: '50',
                }
            }
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
                0: "Oh! Here you are already, ",
                1: "At this counter, I can help you with both general issues\n and issues you may face with other residents.",
                2: "We can delve into the details when specific concerns arise.\n No need to worry about that right now!",
                3: "But since you're here, I may as well ask... \n Do you have any specific concerns at the moment?",
            },
            question: {
                0: "What is your profession?",
                2: "Do you ",
            }
        },
        function: {
            0: "A: Play music",
            1: "B: Chat with him",
        },
        music: {
            0: 'Alrighty, KK is at your service. \n Looks like it is time for me to show \n off my skill',
            1: 'You know, back in the day, \n I use to be pretty popular with the ladies \n because of my splendid finger techinique',
            2: 'Guitar-fingering, of course hahaha',
            3: 'Anyways, would you like to choose your own song \n let me play my own?',
        }

    },
    3: {
        name: "Tom Nook",
        dialouge: {
            default: {
                0: "Look's who's here \n ain't it my favourite villager, ",
                1: "I'm gladly to be at your service\n as long as you remain my patron, that is...",
                2: "Anyways, there is lots I can do for you, \n if you are willing to pay the price required",
                3: "Alright, now tell me, \n what brings you here?",
            },

            question: {
                0: "What is your profession?",
                2: "Do you ",
            }
        },
        function: {
            0: "A: Buy items",
            1: 'B: Tell stories',
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
                3: "so don't fret, cupcake, \n what can Marshal help you with?",
            },
            info: {

            },
            question: {
                0: "What is your profession?",
                2: "Do you ",
            }
        },

    },
}

