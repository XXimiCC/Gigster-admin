GigAdmin.ConfigHandler = GigAdmin.ConfigHandler || {};

(function () {
    'use strict';

    GigAdmin.ConfigHandler = {
        getValue : function(key){
            var env;
            switch( window.location.hostname ){
                case "localhost":
                case "local.giggster.com":
                case "127.0.0.1":
                case "192.168.1.3":
                case "192.168.1.2":
                case "192.168.100.218":
                case "giggster-web":
                    env = 'Local';
                    break;
                case "preview.giggster.com":
                    env = 'Dev';
                    break;
                case "giggster.com":
                    env = 'Production';
                    break;
                default:
                    throw('Unknown environment: ' + window.location.hostname );
            }
            return GigConfig[env][key];
        }
    };

    GigAdmin.gigTypes = {
        light: 'Light Gigg',
        medium: 'Medium Gigg',
        high: 'High Gigg',
        specialoffer: 'Special Offer'
    };

    GigAdmin.statesList = [
    { value:"AL", text:"Alabama" },
    { value:"AK", text:"Alaska" },
    { value:"AZ", text:"Arizona" },
    { value:"AR", text:"Arkansas" },
    { value:"CA", text:"California" },
    { value:"CO", text:"Colorado" },
    { value:"CT", text:"Connecticut" },
    { value:"DE", text:"Delaware" },
    { value:"DC", text:"District Of Columbia" },
    { value:"FL", text:"Florida" },
    { value:"GA", text:"Georgia" },
    { value:"HI", text:"Hawaii" },
    { value:"ID", text:"Idaho" },
    { value:"IL", text:"Illinois" },
    { value:"IN", text:"Indiana" },
    { value:"IA", text:"Iowa" },
    { value:"KS", text:"Kansas" },
    { value:"KY", text:"Kentucky" },
    { value:"LA", text:"Louisiana" },
    { value:"ME", text:"Maine" },
    { value:"MD", text:"Maryland" },
    { value:"MA", text:"Massachusetts" },
    { value:"MI", text:"Michigan" },
    { value:"MN", text:"Minnesota" },
    { value:"MS", text:"Mississippi" },
    { value:"MO", text:"Missouri" },
    { value:"MT", text:"Montana" },
    { value:"NE", text:"Nebraska" },
    { value:"NV", text:"Nevada" },
    { value:"NH", text:"New Hampshire" },
    { value:"NJ", text:"New Jersey" },
    { value:"NM", text:"New Mexico" },
    { value:"NY", text:"New York" },
    { value:"NC", text:"North Carolina" },
    { value:"ND", text:"North Dakota" },
    { value:"OH", text:"Ohio" },
    { value:"OK", text:"Oklahoma" },
    { value:"OR", text:"Oregon" },
    { value:"PA", text:"Pennsylvania" },
    { value:"RI", text:"Rhode Island" },
    { value:"SC", text:"South Carolina" },
    { value:"SD", text:"South Dakota" },
    { value:"TN", text:"Tennessee" },
    { value:"TX", text:"Texas" },
    { value:"UT", text:"Utah" },
    { value:"VT", text:"Vermont" },
    { value:"VA", text:"Virginia" },
    { value:"WA", text:"Washington" },
    { value:"WV", text:"West Virginia" },
    { value:"WI", text:"Wisconsin" },
    { value:"WY", text:"Wyoming" }
    ];

    GigAdmin.languagesList = [
    {"code":"id","name":"Indonesian","nativeName":"Bahasa Indonesia"},
    {"code":"ms","name":"Malay","nativeName":"bahasa Melayu, بهاس ملايو‎"},
    {"code":"bn","name":"Bengali","nativeName":"বাংলা"},
    {"code":"da","name":"Danish","nativeName":"dansk"},
    {"code":"de","name":"German","nativeName":"Deutsch"},
    {"code":"en","name":"English","nativeName":"English"},
    {"code":"es","name":"Spanish","nativeName":"español, castellano"},
    {"code":"fr","name":"French","nativeName":"français, langue française"},
    {"code":"hi","name":"Hindi","nativeName":"हिन्दी, हिंदी"},
    {"code":"it","name":"Italian","nativeName":"Italiano"},
    {"code":"hu","name":"Hungarian","nativeName":"Magyar"},
    {"code":"nl","name":"Dutch","nativeName":"Nederlands, Vlaams"},
    {"code":"no","name":"Norwegian","nativeName":"Norsk"},
    {"code":"pl","name":"Polish","nativeName":"polski"},
    {"code":"pt","name":"Portuguese","nativeName":"Português"},
    {"code":"pa","name":"Panjabi, Punjabi","nativeName":"ਪੰਜਾਬੀ, پنجابی‎"},
    {"code":"fi","name":"Finnish","nativeName":"suomi, suomen kieli"},
    {"code":"sv","name":"Swedish","nativeName":"svenska"},
    {"code":"tl","name":"Tagalog","nativeName":"Wikang Tagalog, ᜏᜒᜃᜅ᜔ ᜆᜄᜎᜓᜄ᜔"},
    {"code":"tr","name":"Turkish","nativeName":"Türkçe"},
    {"code":"cs","name":"Czech","nativeName":"česky, čeština"},
    {"code":"el","name":"Greek, Modern","nativeName":"Ελληνικά"},
    {"code":"ru","name":"Russian","nativeName":"русский язык"},
    {"code":"uk","name":"Ukrainian","nativeName":"українська"},
    {"code":"he","name":"Hebrew (modern)","nativeName":"עברית"},
    {"code":"ar","name":"Arabic","nativeName":"العربية"},
    {"code":"zh","name":"Chinese","nativeName":"中文 (Zhōngwén), 汉语, 漢語"},
    {"code":"ja","name":"Japanese","nativeName":"日本語 (にほんご／にっぽんご)"},
    {"code":"ko","name":"Korean","nativeName":"한국어 (韓國語), 조선말 (朝鮮語)"}
    ];
})();
