import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next)
  .init({
    resources: {
        en: {
          translations: {
            auth: {
              register: "Sign up",
              login: "Sign in",
              credentials: "Credentials",
              phone: "Phone number:",
              fullname: "Full name:",
              password: "Password:",
              repeatPassword: "Repeat password:",
              address: "Address",
              country: "Country:",
              city: "City:",
              street: "Street:",
              houseNumber: "House number:",
              entrance: "Entrance:",
              floor: "Floor:",
              flat: "Flat:",
              loginLink: "Already have an account?",
              registerLink: "Don't have an account?",
              error: {
                phone: "Invalid phone",
                fullname: "Invalid name",
                password: "Password not specified",
                repeatPassword: "Passwords do not match",
                address: "Invalid address",
                phoneNotUnique: "Phone is not unique",
                wrongCredentials: "Username or password is incorrect",
                register: "Couldn't sign up",
                login: "Couldn't sign in"
              }
            }
          }
        },
        ua: {
          translations: {
            auth: {
              register: "Зареєструватися",
              login: "Увійти",
              credentials: "Облікові дані",
              phone: "Номер телефону:",
              fullname: "Повне ім'я:",
              password: "Пароль:",
              repeatPassword: "Повторіть пароль:",
              address: "Адреса",
              country: "Країна:",
              city: "Місто:",
              street: "Вулиця:",
              houseNumber: "Номер будинку:",
              entrance: "Під'їзд:",
              floor: "Поверх:",
              flat: "Квартира:",
              loginLink: "Вже маєте аккаунт?",
              registerLink: "Немає аккаунту?",
              error: {
                phone: "Недійсний телефон",
                fullname: "Недійсне ім'я",
                password: "Вкажіть пароль",
                repeatPassword: "Паролі не співпадають",
                address: "Недійсна адреса",
                phoneNotUnique: "Телефон не є унікальним",
                wrongCredentials: "Неправильний логін або пароль",
                register: "Не вдалося зареєструватися",
                login: "Не вдалося увійти"
              }
            }
          }
        }
    },
    lng: "en",
    fallbackLng: "en",
    debug: true,

    keySeparator: '.',
  
    ns: ["translations"],
    defaultNS: "translations",
  
    interpolation: {
      escapeValue: false,
      formatSeparator: ","
    },
  
    react: {
      wait: true
    }
  });
  
  export default i18n;