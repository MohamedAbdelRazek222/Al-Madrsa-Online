
const mongoose = require("mongoose");
const validator= require("validator") 
const { Schema } = mongoose;
const ParentSchema = mongoose.Schema(
  {
    Parent_name: {
      type: String,
      required: true,
    },

    phone_number: {
      type: String,
      required: true,
      validate(value){
        if (!validator.isMobilePhone(value,['am-Am', 'ar-AE', 'ar-BH', 'ar-DZ', 'ar-EG', 'ar-IQ', 
        'ar-JO', 'ar-KW', 'ar-PS', 'ar-SA', 'ar-SY', 'ar-TN', 'az-AZ', 'az-LY', 'az-LB', 'bs-BA', 
        'be-BY', 'bg-BG', 'bn-BD', 'ca-AD', 'cs-CZ', 'da-DK', 'de-DE', 'de-AT', 'de-CH', 'de-LU', 
        'dv-MV', 'el-GR', 'en-AU', 'en-BM', 'en-BW', 'en-CA', 'en-GB', 'en-GG', 'en-GH', 'en-GY', 
        'en-HK', 'en-MO', 'en-IE', 'en-IN', 'en-KE', 'en-KI', 'en-MT', 'en-MU', 'en-NG', 'en-NZ', 
        'en-PK', 'en-PH', 'en-RW', 'en-SG', 'en-SL', 'en-UG', 'en-US', 'en-TZ', 'en-ZA', 'en-ZM', 
        'en-ZW', 'es-AR', 'es-BO', 'es-CL', 'es-CO', 'es-CR', 'es-CU', 'es-DO', 'es-HN', 'es-PE', 
        'es-EC', 'es-ES', 'es-MX', 'es-PA', 'es-PY', 'es-SV', 'es-UY', 'es-VE', 'et-EE', 'fa-IR', 
        'fi-FI', 'fj-FJ', 'fo-FO', 'fr-BE', 'fr-BF', 'fr-FR', 'fr-GF', 'fr-GP', 'fr-MQ', 'fr-PF',
         'fr-RE', 'ga-IE', 'he-IL', 'hu-HU', 'id-ID', 'it-IT', 'it-SM', 'ja-JP', 'ka-GE', 'kk-KZ', 
         'kl-GL', 'ko-KR', 'lt-LT', 'ms-MY', 'mz-MZ', 'nb-NO', 'ne-NP', 'nl-BE', 'nl-NL', 'nn-NO', 
         'pl-PL', 'pt-BR', 'pt-PT', 'pt-AO', 'ro-RO', 'ru-RU', 'si-LK', 'sl-SI', 'sk-SK', 'sq-AL', 
         'sr-RS', 'sv-SE', 'tg-TJ', 'th-TH', 'tk-TM', 'tr-TR', 'uk-UA', 'uz-UZ', 'vi-VN', 'zh-CN', 
         'zh-HK', 'zh-MO', 'zh-TW', 'dz-BT'] )) {
          throw new Error("Mobile Phone is not valid")
        } 
      }
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate(value){
        if (!validator.isEmail(value)) {
          throw new Error("Email is not valid")
        }
      }
    },
    student_Id:
      [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student',default: null }]
    ,
    Password:{
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'Parent'
    },
  },
)
const ParentModel = mongoose.model("Parent", ParentSchema);

module.exports =  ParentModel;
