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
            },
            createPost: {
              title: 'New post',
              error: {
                title: 'Enter post title',
                content: 'Enter post content',
                poll: {
                  length: 'Making a poll requires at least 2 options',
                  names: 'Not all poll options have names'
                },
                http: {
                  client: 'Invalid data provided',
                  server: 'Server error'
                }
              },
              form: {
                title: 'Title',
                content: 'Post content',
                isPoll: 'Is poll?',
                addOption: 'Add option',
                pollOption: 'Option',
                submit: 'Submit post'
              }
            },
            group: {
              placeholder: 'Choose a group from the list',
              myGroups: {
                title: 'My groups',
                empty: "You haven't joined any groups yet",
              },
              available: {
                title: 'Available groups',
                empty: "You have no available groups right now",
              },
              street: '',
              house: '',
              entrance: 'Entrance',
              floor: 'Floor',
              flat: 'Flat',
              goto: 'Go to group',
              join: 'Join group',
            },
            user: {
              pending: 'Pending request',
              member: 'Member',
              admin: 'Administrator',
              atHome: 'At home',
              left: 'Left home',
              unknown: 'Location unknown',
              contacts: 'Contacts',
              address: 'Address',
            },
            action: {
              delete: 'Delete',
              approve: 'Approve',
              revertVote: 'Revert vote',
              block: 'Block',
            },
            posts: {
              members: 'Members',
              unapproved: 'Unapproved posts',
              approved: 'Approved posts',
              create: 'Create post',
              hasPoll: 'Has a poll',
              empty: 'No posts here yet'
            },
            users: {
              posts: 'Posts',
              approved: 'Group members',
              unapproved: 'Pending requests',
              empty: 'No users found'
            },
            profile: {
              logout: 'Logout'
            },
          }
        },
        uk: {
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
            },
            createPost: {
              title: 'Нова публікація',
              error: {
                title: 'Введіть заголовок публікації',
                content: 'Введіть вміст публікації',
                poll: {
                  length: 'Створення голосування потребує наявності принаймні 2 варіантів відповіді',
                  names: 'Не всі варіанти мають назву'
                },
                http: {
                  client: 'Введено недійсні дані ',
                  server: 'Помилка сервера'
                }
              },
              form: {
                title: 'Заголовок',
                content: 'Вміст',
                isPoll: 'Є голосуванням?',
                addOption: 'Додати варіант',
                pollOption: 'Варіант',
                submit: 'Відправити публікацію'
              }
            },
            group: {
              placeholder: 'Оберіть групу зі списку',
              myGroups: {
                title: 'Мої групи',
                empty: "Ви ще не приєдналися до групи",
              },
              available: {
                title: 'Доступні групи',
                empty: "Зараз немає доступних Вам груп",
              },
              street: '',
              house: '',
              entrance: "Під'їзд",
              floor: 'Поверх',
              flat: 'Квартира',
              goto: 'Перейти до групи',
              join: 'Приєднатися до групи',
            },
            user: {
              pending: 'Надіслав заявку',
              member: 'Член групи',
              admin: 'Адміністратор',
              atHome: 'Вдома',
              left: 'Вийшов з дому',
              unknown: 'Місцезнаходження невідомо',
              contacts: 'Контакти',
              address: 'Адреса',
            },
            action: {
              delete: 'Видалити',
              approve: 'Підтвердити',
              revertVote: 'Повернути голос',
              block: 'Заблокувати',
            },
            posts: {
              members: 'Члени групи',
              unapproved: 'Несхвалені публікації',
              approved: 'Схвалені публікації',
              create: 'Створити публікацію',
              hasPoll: 'Містить голосування',
              empty: 'Тут поки що немає публікацій'
            },
            users: {
              posts: 'Публікації',
              approved: 'Члени групи',
              unapproved: 'Заявки',
              empty: 'Користувачів не знайдено'
            },
            profile: {
              logout: 'Вийти'
            },
          }
        }
    },
    lng: "uk",
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