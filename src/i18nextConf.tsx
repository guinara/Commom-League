import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { languageDetector, languageDetectorOptions } from "./lang-detector";

const resources = {
    en: {
        translation: {

            "Last updated: 15th October 2024": "Last updated: 15th October 2024",

            "Sign In": "Sign In",
            "Filtered Tournaments": "Filtered Tournaments",
            "Sign Up": "Sign Up",
            "Create Account": "Create Account",
            "Retry Password": "Retry Password",
            "Password": "Password",
            "Full Name": "Full Name",
            "Username": "Username",
            "Forgot Your Password?": "Forgot Your Password?",
            "Welcome, Friend!": "Welcome, Friend!",
            "Enter your personal details and start your journey with us": "Enter your personal details and start your journey with us",
            "Welcome Back!": "Welcome Back!",
            "Email": "Email",
            "Ongoing Championships": "Ongoing Championships",
            "Join the Team": "Join the Team",
            "Highlights": "Highlights",
            "Search by Rank": "Search by Rank",
            "Choose Language": "Choose Language",
            "Select a language for translation:": "Select a language for translation:",
            "Select a language": "Select a language",
            "Close": "Close",
            "User Name": "User Name",
            "View Profile": "View Profile",
            "To keep connected with us please login with your personal info": "To keep connected with us please login with your personal info",
            "Ongoing": "Ongoing",   // Tradução de "Ongoing"
            "Finished": "Finished", // Tradução de "Finished"
            "Tournaments": "Tournaments", // Tradução de "Tournaments"
            "Selected Filters": "Selected Filters", // Tradução de "Selected Filters"
            "Value": "Value", // Tradução de "Value"
            "Matches": "Matches", // Tradução de "Matches"
            "Teams": "Teams", // Tradução de "Teams"
            "Filters": "Filters",
            "Value Ascending": "Value Ascending",
            "Value Descending": "Value Descending",
            "Sort By": "Sort By",
            "Most Recent": "Most Recent",
            "Oldest": "Oldest",
            "Status": "Status",
            "View": "View",
            "Join": "Join",
            "Chips": "Chips",
            "Select Captain": "Select Captain",
            "Ban": "Ban",
            "History": "History",
            "Members": "Members",
            "Leader": "Leader",
            "Leave Team": "Leave Team",
            "Privacy Policy": "Privacy Policy",
            "COMMONLEAGUE PRIVACY POLICY": "COMMONLEAGUE PRIVACY POLICY",
            "The CommonLeague is committed to protecting the privacy and personal data of its users. This Privacy Policy describes how we collect, use, and protect your personal data in accordance with applicable data protection laws, including the General Data Protection Law (LGPD) in Brazil and the General Data Protection Regulation (GDPR) in the European Union.":
                "The CommonLeague is committed to protecting the privacy and personal data of its users. This Privacy Policy describes how we collect, use, and protect your personal data in accordance with applicable data protection laws, including the General Data Protection Law (LGPD) in Brazil and the General Data Protection Regulation (GDPR) in the European Union.",
            "1. Data Collection": "1. Data Collection",
            "We collect personal information when you register on our platform, participate in tournaments, or interact with our services. This may include your name, email address, payment data, and platform usage information.":
                "We collect personal information when you register on our platform, participate in tournaments, or interact with our services. This may include your name, email address, payment data, and platform usage information.",

            "2. Use of Data": "2. Use of Data",
            "We use your data to improve your experience on our platform, send updates about tournaments and relevant offers, and provide customer support. We may also use your data for analytical and marketing purposes.":
                "We use your data to improve your experience on our platform, send updates about tournaments and relevant offers, and provide customer support. We may also use your data for analytical and marketing purposes.",

            "3. Data Sharing": "3. Data Sharing",
            "We do not share your personal data with third parties, except when necessary to comply with the law or with service providers who help us operate our platform.":
                "We do not share your personal data with third parties, except when necessary to comply with the law or with service providers who help us operate our platform.",

            "4. Security": "4. Security",
            "We take security measures to protect your personal data from unauthorized access, alteration, or destruction. However, we cannot guarantee absolute security in the transmission of data over the internet.":
                "We take security measures to protect your personal data from unauthorized access, alteration, or destruction. However, we cannot guarantee absolute security in the transmission of data over the internet.",

            "5. Your Rights ": "5. Your Rights",
            "You have the right to access, correct, or delete your personal data, as well as request restrictions on the processing of your data. To exercise your rights, contact us through our support.":
                "You have the right to access, correct, or delete your personal data, as well as request restrictions on the processing of your data. To exercise your rights, contact us through our support.",

            "6. Changes to the Privacy Policy": "6. Changes to the Privacy Policy",
            "CommonLeague reserves the right to modify this Privacy Policy at any time. Changes will be posted on this page with the updated review date.":
                "CommonLeague reserves the right to modify this Privacy Policy at any time. Changes will be posted on this page with the updated review date.",

            "7. Contact": "7. Contact",
            "If you have any questions about our Privacy Policy, contact us at the email: integradoifspprojeto@gmail.com":
                "If you have any questions about our Privacy Policy, contact us at the email: integradoifspprojeto@gmail.com",

               "Login failed. Please check your credentials and try again." :  "Login failed. Please check your credentials and try again."
    }
},
    pt: {
        translation: {
            "Last updated: 15th October 2024": "Última atualização: 15 de Outubro de 2024",
            "Sign In": "Entrar",
            "Filtered Tournaments": "Torneios Filtrados",
            "Select Captain": "Selecione o Capitão",
            "Ban": "Banir",
            "History": "Histórico",
            "Members": "Membros",
            "View": "Ver",
            "Sign Up": "Criar Conta",
            "Create Account": "Criar Conta",
            "Retry Password": "Repetir Senha",
            "Password": "Senha",
            "Full Name": "Nome Completo",
            "Username": "Nome de Usuário",
            "Forgot Your Password?": "Esqueceu sua Senha?",
            "Welcome, Friend!": "Bem-vindo, Amigo!",
            "Enter your personal details and start your journey with us": "Insira seus dados pessoais e comece sua jornada conosco",
            "Welcome Back!": "Bem-vindo de volta!",
            "Email": "Email",
            "Ongoing Championships": "Campeonatos em Andamento",
            "Join the Team": "Entrar no time",
            "Highlights": "Destaques",
            "Search by Rank": "Busque por Rank",
            "Choose Language": "Escolha o Idioma",
            "Select a language for translation:": "Selecione um idioma para tradução:",
            "Select a language": "Selecione um idioma",
            "Close": "Fechar",
            "User Name": "Nome de Usuário",
            "View Profile": "Ver Perfil",
            "To keep connected with us please login with your personal info": "Para continuar conectado conosco, faça login com suas informações pessoais",
            "Ongoing": "Em andamento",
            "Finished": "Finalizado",
            "Tournaments": "Torneios",
            "Selected Filters": "Filtros Selecionados",
            "Value": "Valor",
            "Matches": "Partidas",
            "Teams": "Times",
            "Filters": "Filtros",
            "Value Ascending": "Valor Crescente",
            "Value Descending": "Valor Decrescente",
            "Sort By": "Ordenar Por",
            "Most Recent": "Mais Recente",
            "Oldest": "Mais Antigo",
            "Status": "Status",
            "Join": "Entrar",
            "Chips": "Fichas",
            "Leader": "Líder",
            "Leave Team": "Sair do Time",
            "Privacy Policy": "Política de Privacidade",
            "COMMONLEAGUE PRIVACY POLICY": "POLÍTICA DE PRIVACIDADE DA COMMONLEAGUE",
            "The CommonLeague is committed to protecting the privacy and personal data of its users. This Privacy Policy describes how we collect, use, and protect your personal data in accordance with applicable data protection laws, including the General Data Protection Law (LGPD) in Brazil and the General Data Protection Regulation (GDPR) in the European Union.":
              "A CommonLeague compromete-se a proteger a privacidade e os dados pessoais dos seus usuários. Esta Política de Privacidade descreve como coletamos, usamos e protegemos seus dados pessoais de acordo com as leis de proteção de dados aplicáveis, incluindo a Lei Geral de Proteção de Dados (LGPD) no Brasil e o General Data Protection Regulation (GDPR) na União Europeia.",
            "1. Data Collection": "1. Coleta de Dados",
            "We collect personal information when you register on our platform, participate in tournaments, or interact with our services. This may include your name, email address, payment data, and platform usage information.":
              "Coletamos informações pessoais quando você se registra na nossa plataforma, participa de torneios ou interage com nossos serviços. Isso pode incluir seu nome, endereço de e-mail, dados de pagamento e informações de uso da plataforma.",
            "2. Use of Data": "2. Uso dos Dados",
            "We use your data to improve your experience on our platform, send updates about tournaments and relevant offers, and provide customer support. We may also use your data for analytical and marketing purposes.":
              "Utilizamos seus dados para melhorar sua experiência em nossa plataforma, enviar atualizações sobre torneios e ofertas relevantes, e fornecer suporte ao cliente. Também podemos usar seus dados para fins analíticos e de marketing.",
            "3. Data Sharing": "3. Compartilhamento de Dados",
            "We do not share your personal data with third parties, except when necessary to comply with the law or with service providers who help us operate our platform.":
              "Não compartilhamos seus dados pessoais com terceiros, exceto quando necessário para cumprir com a lei, ou com fornecedores de serviços que nos ajudam a operar nossa plataforma.",
            "4. Security": "4. Segurança",
            "We take security measures to protect your personal data from unauthorized access, alteration, or destruction. However, we cannot guarantee absolute security when transmitting data over the internet.":
              "Adotamos medidas de segurança para proteger seus dados pessoais contra acesso não autorizado, alteração ou destruição. No entanto, não podemos garantir segurança absoluta na transmissão de dados pela internet.",
            "5. Your Rights": "5. Seus Direitos",
            "You have the right to access, correct, or delete your personal data, as well as request restrictions on the processing of your data. To exercise your rights, please contact us through our support.":
              "Você tem o direito de acessar, corrigir ou excluir seus dados pessoais, bem como solicitar restrições sobre o processamento de seus dados. Para exercer seus direitos, entre em contato conosco através do nosso suporte.",
            "6. Changes to the Privacy Policy": "6. Alterações na Política de Privacidade",
            "CommonLeague reserves the right to modify this Privacy Policy at any time. Changes will be published on this page with the updated review date.":
              "A CommonLeague se reserva o direito de modificar esta Política de Privacidade a qualquer momento. As alterações serão publicadas nesta página com a data de revisão atualizada.",
            "7. Contact": "7. Contato",
            "If you have any questions about our Privacy Policy, please contact us via email: integradoifspprojeto@gmail.com":
              "Se você tiver dúvidas sobre nossa Política de Privacidade, entre em contato conosco pelo e-mail: integradoifspprojeto@gmail.com",

                "Login failed. Please check your credentials and try again." :  "Por favor, verifique suas credenciais e tente novamente."
          }
          
    },
    jpn: {
        translation: {
            "Last updated: 15th October 2024": "最終更新日：2024年10月15日",
            "Sign In": "サインイン",
            "Sign Up": "サインアップ",
            "Filtered Tournaments": "フィルタリングされたトーナメント",
            "Create Account": "アカウント作成",
            "Retry Password": "パスワードを再入力",
            "Password": "パスワード",
            "Full Name": "フルネーム",
            "View": "表示",
            "Select Captain": "キャプテンを選択",
            "Ban": "禁止",
            "History": "履歴",
            "Members": "メンバー",
            "Username": "ユーザー名",
            "Filters": "フィルター",
            "Forgot Your Password?": "パスワードをお忘れですか？",
            "Welcome, Friend!": "ようこそ、友達！",
            "Enter your personal details and start your journey with us": "個人情報を入力して、私たちと一緒に旅を始めましょう",
            "Welcome Back!": "お帰りなさい！",
            "Email": "メールアドレス",
            "Ongoing Championships": "進行中のチャンピオンシップ",
            "Join the Team": "チームに参加",
            "Highlights": "ハイライト",
            "Search by Rank": "ランクで検索",
            "Choose Language": "言語を選択",
            "Select a language for translation:": "翻訳する言語を選択してください：",
            "Select a language": "言語を選択",
            "Close": "閉じる",
            "User Name": "ユーザー名",
            "View Profile": "プロフィールを見る",
            "To keep connected with us please login with your personal info": "私たちとつながり続けるには、個人情報でログインしてください",
            "Ongoing": "進行中",
            "Finished": "終了",
            "Tournaments": "トーナメント",
            "Selected Filters": "選択したフィルター",
            "Value": "値",
            "Matches": "試合",
            "Teams": "チーム",
            "Status": "ステータス",
            "Value Ascending": "値が小さい順",
            "Value Descending": "値が大きい順",
            "Sort By": "並び替え",
            "Most Recent": "最新",
            "Oldest": "最古",
            "Join": "参加する",
            "Chips": "チップ",
            "Leader": "リーダー",
            "Leave Team": "チームを脱退",
            "Privacy Policy": "プライバシーポリシー",
            "COMMONLEAGUE PRIVACY POLICY": "COMMONLEAGUE プライバシーポリシー",
            "The CommonLeague is committed to protecting the privacy and personal data of its users. This Privacy Policy describes how we collect, use, and protect your personal data in accordance with applicable data protection laws, including the General Data Protection Law (LGPD) in Brazil and the General Data Protection Regulation (GDPR) in the European Union.":
                "CommonLeagueは、ユーザーのプライバシーと個人データを保護することを約束します。このプライバシーポリシーは、ブラジルの一般データ保護法（LGPD）および欧州連合の一般データ保護規則（GDPR）を含む適用されるデータ保護法に従って、どのように個人データを収集、使用、保護するかを説明します。",
            "1. Data Collection": "1. データ収集",
            "We collect personal information when you register on our platform, participate in tournaments, or interact with our services. This may include your name, email address, payment data, and platform usage information.":
                "私たちは、あなたがプラットフォームに登録したり、トーナメントに参加したり、サービスを利用したりする際に個人情報を収集します。これには、名前、メールアドレス、支払い情報、およびプラットフォームの使用情報が含まれる場合があります。",
            "2. Data Usage": "2. データの使用",
            "We use your data to improve your experience on our platform, send updates about tournaments and relevant offers, and provide customer support. We may also use your data for analytical and marketing purposes.":
                "私たちは、あなたの体験を向上させるためにデータを使用します。これには、トーナメントに関する更新情報や関連するオファーを送信し、カスタマーサポートを提供することが含まれます。また、分析やマーケティング目的でデータを使用することもあります。",
            "3. Data Sharing": "3. データ共有",
            "We do not share your personal data with third parties, except when necessary to comply with the law or with service providers who help us operate our platform.":
                "私たちは、法律を遵守するために必要な場合や、プラットフォームの運営を支援するサービスプロバイダーといった第三者と、あなたの個人データを共有することはありません。",
            "4. Security": "4. セキュリティ",
            "We take security measures to protect your personal data from unauthorized access, alteration, or destruction. However, we cannot guarantee absolute security in the transmission of data over the internet.":
                "私たちは、不正アクセス、改ざん、または破壊からあなたの個人データを守るためにセキュリティ対策を講じています。しかし、インターネット経由でのデータ送信において完全なセキュリティを保証することはできません。",
            "5. Your Rights": "5. あなたの権利",
            "You have the right to access, correct, or delete your personal data, as well as request restrictions on the processing of your data. To exercise your rights, contact us through our support.":
                "あなたには自分の個人データにアクセスし、修正し、削除する権利があり、データ処理に制限を加えるよう要求することができます。権利を行使するには、サポートを通じて私たちに連絡してください。",
            "6. Changes to Privacy Policy": "6. プライバシーポリシーの変更",
            "CommonLeague reserves the right to modify this Privacy Policy at any time. Changes will be posted on this page with the updated review date.":
                "CommonLeagueは、いつでもこのプライバシーポリシーを変更する権利を留保します。変更は、最新のレビュー日と共にこのページに掲載されます。",
            "7. Contact": "7. 連絡先",
            "If you have any questions about our Privacy Policy, please contact us at the email: integradoifspprojeto@gmail.com":
                "プライバシーポリシーに関する質問がある場合は、メール（integradoifspprojeto@gmail.com）でお問い合わせください。",
                "Decline": "辞退",
  "Accept": "受け入れる",

    "Login failed. Please check your credentials and try again." :  "Error de inicio de sesión. Por favor, verifica tus credenciales y vuelve a intentarlo."
        }
    },
    
    
    es: {
        translation: {
            "Last updated: 15th October 2024": "Última actualización: 15 de Octubre de 2024",
            "Sign In": "Iniciar sesión",
            "Sign Up": "Crear cuenta",
            "Filtered Tournaments": "Torneos Filtrados",
            "Create Account": "Crear cuenta",
            "Retry Password": "Repetir contraseña",
            "Password": "Contraseña",
            "View": "Ver",
            "Full Name": "Nombre completo",
            "Username": "Nombre de usuario",
            "Filters": "Filtros",
            "Select Captain": "Seleccionar Capitán",
            "Ban": "Prohibir",
            "History": "Historial",
            "Members": "Miembros",
            "Forgot Your Password?": "¿Olvidaste tu contraseña?",
            "Welcome, Friend!": "¡Bienvenido, amigo!",
            "Enter your personal details and start your journey with us": "Introduce tus datos personales y comienza tu viaje con nosotros",
            "Welcome Back!": "¡Bienvenido de nuevo!",
            "Email": "Correo electrónico",
            "Ongoing Championships": "Campeonatos en curso",
            "Join the Team": "Unirse al equipo",
            "Highlights": "Destacados",
            "Status": "Estado",
            "Search by Rank": "Buscar por Rango",
            "Choose Language": "Elegir idioma",
            "Select a language for translation:": "Selecciona un idioma para traducción:",
            "Select a language": "Selecciona un idioma",
            "Close": "Cerrar",
            "User Name": "Nombre de Usuario",
            "View Profile": "Ver Perfil",
            "To keep connected with us please login with your personal info": "Para mantenerte conectado con nosotros, inicia sesión con tu información personal",
            "Ongoing": "En curso",
            "Finished": "Finalizado",
            "Tournaments": "Torneos",
            "Selected Filters": "Filtros seleccionados",
            "Value": "Valor",
            "Matches": "Partidos",
            "Teams": "Equipos",
            "Value Ascending": "Valor Ascendente",
            "Value Descending": "Valor Descendente",
            "Sort By": "Ordenar Por",
            "Most Recent": "Más Reciente",
            "Oldest": "Más Antiguo",
            "Join": "Unirse",
            "Chips": "Fichas",
            "Leader": "Líder",
            "Leave Team": "Dejar el equipo",
            "Privacy Policy": "Política de Privacidad",
            "COMMONLEAGUE PRIVACY POLICY": "POLÍTICA DE PRIVACIDAD DE COMMONLEAGUE",
            "The CommonLeague is committed to protecting the privacy and personal data of its users. This Privacy Policy describes how we collect, use, and protect your personal data in accordance with applicable data protection laws, including the General Data Protection Law (LGPD) in Brazil and the General Data Protection Regulation (GDPR) in the European Union.":
                "CommonLeague se compromete a proteger la privacidad y los datos personales de sus usuarios. Esta Política de Privacidad describe cómo recopilamos, usamos y protegemos sus datos personales de acuerdo con las leyes de protección de datos aplicables, incluida la Ley General de Protección de Datos (LGPD) en Brasil y el Reglamento General de Protección de Datos (GDPR) en la Unión Europea.",
            "1. Coleta de Dados": "1. Recopilación de Datos",
            "Coletamos informações pessoais quando você se registra na nossa plataforma, participa de torneios ou interage com nossos serviços. Isso pode incluir seu nome, endereço de e-mail, dados de pagamento e informações de uso da plataforma.":
                "Recopilamos información personal cuando te registras en nuestra plataforma, participas en torneos o interactúas con nuestros servicios. Esto puede incluir tu nombre, dirección de correo electrónico, datos de pago e información sobre el uso de la plataforma.",

            "2. Uso dos Dados": "2. Uso de los Datos",
            "Utilizamos seus dados para melhorar sua experiência em nossa plataforma, enviar atualizações sobre torneios e ofertas relevantes, e fornecer suporte ao cliente. Também podemos usar seus dados para fins analíticos e de marketing.":
                "Usamos tus datos para mejorar tu experiencia en nuestra plataforma, enviar actualizaciones sobre torneos y ofertas relevantes, y proporcionar soporte al cliente. También podemos usar tus datos para fines analíticos y de marketing.",

            "3. Compartilhamento de Dados": "3. Compartición de Datos",
            "Não compartilhamos seus dados pessoais com terceiros, exceto quando necessário para cumprir com a lei, ou com fornecedores de serviços que nos ajudam a operar nossa plataforma.":
                "No compartimos tus datos personales con terceros, excepto cuando sea necesario para cumplir con la ley, o con proveedores de servicios que nos ayudan a operar nuestra plataforma.",

            "4. Segurança": "4. Seguridad",
            "Adotamos medidas de segurança para proteger seus dados pessoais contra acesso não autorizado, alteração ou destruição. No entanto, não podemos garantir segurança absoluta na transmissão de dados pela internet.":
                "Tomamos medidas de seguridad para proteger tus datos personales contra el acceso no autorizado, alteración o destrucción. Sin embargo, no podemos garantizar una seguridad absoluta en la transmisión de datos a través de internet.",

            "5. Seus Direitos": "5. Tus Derechos",
            "Você tem o direito de acessar, corrigir ou excluir seus dados pessoais, bem como solicitar restrições sobre o processamento de seus dados. Para exercer seus direitos, entre em contato conosco através do nosso suporte.":
                "Tienes el derecho de acceder, corregir o eliminar tus datos personales, así como solicitar restricciones sobre el procesamiento de tus datos. Para ejercer tus derechos, contacta con nosotros a través de nuestro soporte.",

            "6. Alterações na Política de Privacidade": "6. Cambios en la Política de Privacidad",
            "A CommonLeague se reserva o direito de modificar esta Política de Privacidade a qualquer momento. As alterações serão publicadas nesta página com a data de revisão atualizada.":
                "CommonLeague se reserva el derecho de modificar esta Política de Privacidad en cualquier momento. Los cambios serán publicados en esta página con la fecha de revisión actualizada.",

            "7. Contato": "7. Contacto",
            "Se você tiver dúvidas sobre nossa Política de Privacidade, entre em contato conosco pelo e-mail: integradoifspprojeto@gmail.com":
                "Si tienes preguntas sobre nuestra Política de Privacidad, contáctanos por correo electrónico a: integradoifspprojeto@gmail.com",

                 "Login failed. Please check your credentials and try again." :  "Error de inicio de sesión. Por favor, verifica tus credenciales y vuelve a intentarlo."
        }
    },
    fr: {
        translation: {
            "Last updated: 15th October 2024": "Dernière mise à jour : 15 octobre 2024",
            "Sign In": "Se connecter",
            "Sign Up": "Créer un compte",
            "Select Captain": "Sélectionner le Capitaine",
            "Ban": "Interdire",
            "Filtered Tournaments": "Tournois Filtrés",
            "History": "Historique",
            "Members": "Membres",
            "Create Account": "Créer un compte",
            "Retry Password": "Ressaisir le mot de passe",
            "Password": "Mot de passe",
            "View": "Voir",
            "Full Name": "Nom complet",
            "Username": "Nom d'utilisateur",
            "Forgot Your Password?": "Mot de passe oublié ?",
            "Welcome, Friend!": "Bienvenue, ami !",
            "Enter your personal details and start your journey with us": "Entrez vos informations personnelles et commencez votre voyage avec nous",
            "Welcome Back!": "Content de vous revoir !",
            "Email": "E-mail",
            "Status": "Statut",
            "Ongoing Championships": "Championnats en cours",
            "Join the Team": "Rejoindre l'équipe",
            "Highlights": "Points forts",
            "Filters": "Filtres",
            "Search by Rank": "Rechercher par Rang",
            "Choose Language": "Choisir la langue",
            "Select a language for translation:": "Sélectionnez une langue pour la traduction :",
            "Select a language": "Sélectionnez une langue",
            "Close": "Fermer",
            "User Name": "Nom d'utilisateur",
            "View Profile": "Voir le profil",
            "To keep connected with us please login with your personal info": "Pour rester connecté avec nous, veuillez vous connecter avec vos informations personnelles",
            "Ongoing": "En cours",
            "Finished": "Terminé",
            "Tournaments": "Tournois",
            "Selected Filters": "Filtres sélectionnés",
            "Value": "Valeur",
            "Matches": "Matchs",
            "Teams": "Équipes",
            "Value Ascending": "Valeur Croissante",
            "Value Descending": "Valeur Décroissante",
            "Sort By": "Trier Par",
            "Most Recent": "Le Plus Récent",
            "Oldest": "Le Plus Ancien",
            "Join": "Rejoindre",
            "Chips": "Jetons",
            "Leader": "Leader",
            "Leave Team": "Quitter l'équipe",
            "Privacy Policy": "Politique de confidentialité",
            "COMMONLEAGUE PRIVACY POLICY": "POLITIQUE DE CONFIDENTIALITÉ DE COMMONLEAGUE",
            "The CommonLeague is committed to protecting the privacy and personal data of its users. This Privacy Policy describes how we collect, use, and protect your personal data in accordance with applicable data protection laws, including the General Data Protection Law (LGPD) in Brazil and the General Data Protection Regulation (GDPR) in the European Union.":
                "CommonLeague s'engage à protéger la vie privée et les données personnelles de ses utilisateurs. Cette politique de confidentialité décrit comment nous collectons, utilisons et protégeons vos données personnelles conformément aux lois sur la protection des données applicables, y compris la loi générale sur la protection des données (LGPD) au Brésil et le règlement général sur la protection des données (RGPD) dans l'Union européenne.",
            "1. Data Collection": "1. Collecte de Données",
            "We collect personal information when you register on our platform, participate in tournaments, or interact with our services. This may include your name, email address, payment data, and platform usage information.":
                "Nous collectons des informations personnelles lorsque vous vous inscrivez sur notre plateforme, participez à des tournois ou interagissez avec nos services. Cela peut inclure votre nom, votre adresse e-mail, les informations de paiement et les informations d'utilisation de la plateforme.",

            "2. Use of Data": "2. Utilisation des Données",
            "We use your data to improve your experience on our platform, send updates about tournaments and relevant offers, and provide customer support. We may also use your data for analytical and marketing purposes.":
                "Nous utilisons vos données pour améliorer votre expérience sur notre plateforme, envoyer des mises à jour sur les tournois et les offres pertinentes, et fournir un support client. Nous pouvons également utiliser vos données à des fins analytiques et marketing.",

            "3. Data Sharing": "3. Partage des Données",
            "We do not share your personal data with third parties, except when necessary to comply with the law or with service providers who help us operate our platform.":
                "Nous ne partageons pas vos données personnelles avec des tiers, sauf si cela est nécessaire pour se conformer à la loi, ou avec des prestataires de services qui nous aident à exploiter notre plateforme.",

            "4. Security": "4. Sécurité",
            "We take security measures to protect your personal data from unauthorized access, alteration, or destruction. However, we cannot guarantee absolute security in the transmission of data over the internet.":
                "Nous prenons des mesures de sécurité pour protéger vos données personnelles contre tout accès non autorisé, toute altération ou toute destruction. Toutefois, nous ne pouvons garantir une sécurité absolue lors de la transmission des données via Internet.",

            "5. Your Rights": "5. Vos Droits",
            "You have the right to access, correct, or delete your personal data, as well as request restrictions on the processing of your data. To exercise your rights, contact us through our support.":
                "Vous avez le droit d'accéder à vos données personnelles, de les corriger ou de les supprimer, ainsi que de demander des restrictions sur le traitement de vos données. Pour exercer vos droits, contactez-nous via notre support.",

            "6. Changes to the Privacy Policy": "6. Modifications de la Politique de Confidentialité",
            "CommonLeague reserves the right to modify this Privacy Policy at any time. Changes will be posted on this page with the updated review date.":
                "CommonLeague se réserve le droit de modifier cette Politique de Confidentialité à tout moment. Les modifications seront publiées sur cette page avec la date de révision mise à jour.",

            "7. Contact": "7. Contact",
            "If you have any questions about our Privacy Policy, please contact us at the email: integradoifspprojeto@gmail.com":
                "Si vous avez des questions concernant notre Politique de Confidentialité, contactez-nous par e-mail à : integradoifspprojeto@gmail.com",

                "Decline": "Refuser",
"Accept": "Accepter",

   "Login failed. Please check your credentials and try again." :  "Échec de la connexion. Veuillez vérifier vos identifiants et réessayer."
        }
    },
    de: {
        translation: {

            "Last updated: 15th October 2024": "Letzte Aktualisierung: 15. Oktober 2024",
            "Sign In": "Anmelden",
            "Sign Up": "Registrieren",
            "Create Account": "Registrieren",
            "Retry Password": "Passwort erneut eingeben",
            "Password": "Passwort",
            "Filtered Tournaments": "Gefilterte Turniere",
            "Full Name": "Vollständiger Name",
            "Username": "Benutzername",
            "Filters": "Filter",
            "View": "Ansehen",
            "Select Captain": "Wähle Kapitän",
            "Ban": "Sperren",
            "History": "Historie",
            "Members": "Mitglieder",
            "Status": "Status",
            "Forgot Your Password?": "Passwort vergessen?",
            "Welcome, Friend!": "Willkommen, Freund!",
            "Enter your personal details and start your journey with us": "Geben Sie Ihre persönlichen Daten ein und beginnen Sie Ihre Reise mit uns",
            "Welcome Back!": "Willkommen zurück!",
            "Email": "E-Mail",
            "Ongoing Championships": "Laufende Meisterschaften",
            "Join the Team": "Dem Team beitreten",
            "Highlights": "Highlights",
            "Search by Rank": "Suche nach Rang",
            "Choose Language": "Sprache wählen",
            "Select a language for translation:": "Wählen Sie eine Sprache für die Übersetzung:",
            "Select a language": "Wählen Sie eine Sprache",
            "Close": "Schließen",
            "User Name": "Benutzername",
            "View Profile": "Profil anzeigen",
            "To keep connected with us please login with your personal info": "Um mit uns in Verbindung zu bleiben, melden Sie sich bitte mit Ihren persönlichen Daten an",
            "Ongoing": "Laufend",
            "Finished": "Beendet",
            "Tournaments": "Turniere",
            "Selected Filters": "Ausgewählte Filter",
            "Value": "Wert",
            "Matches": "Spiele",
            "Teams": "Teams",
            "Value Ascending": "Wert Aufsteigend",
            "Value Descending": "Wert Absteigend",
            "Sort By": "Sortieren Nach",
            "Most Recent": "Neueste",
            "Oldest": "Älteste",
            "Join": "Beitreten",
            "Chips": "Chips",
            "Leader": "Anführer",
            "Leave Team": "Team verlassen",
            "Privacy Policy": "Datenschutzerklärung",
            "COMMONLEAGUE PRIVACY POLICY": "COMMONLEAGUE DATENSCHUTZERKLÄRUNG",
            "The CommonLeague is committed to protecting the privacy and personal data of its users. This Privacy Policy describes how we collect, use, and protect your personal data in accordance with applicable data protection laws, including the General Data Protection Law (LGPD) in Brazil and the General Data Protection Regulation (GDPR) in the European Union.":
                "Die CommonLeague verpflichtet sich, die Privatsphäre und persönlichen Daten ihrer Nutzer zu schützen. Diese Datenschutzerklärung beschreibt, wie wir Ihre persönlichen Daten gemäß den geltenden Datenschutzgesetzen, einschließlich des Allgemeinen Datenschutzgesetzes (LGPD) in Brasilien und der Allgemeinen Datenschutzverordnung (GDPR) in der Europäischen Union, sammeln, verwenden und schützen.",
            "1. Coleta de Dados": "1. Datenerhebung",
            "Coletamos informações pessoais quando você se registra na nossa plataforma, participa de torneios ou interage com nossos serviços. Isso pode incluir seu nome, endereço de e-mail, dados de pagamento e informações de uso da plataforma.":
                "Wir erheben persönliche Informationen, wenn Sie sich auf unserer Plattform registrieren, an Turnieren teilnehmen oder mit unseren Diensten interagieren. Dies kann Ihren Namen, Ihre E-Mail-Adresse, Zahlungsdaten und Plattformnutzungsinformationen umfassen.",

            "2. Uso dos Dados": "2. Datennutzung",
            "Utilizamos seus dados para melhorar sua experiência em nossa plataforma, enviar atualizações sobre torneios e ofertas relevantes, e fornecer suporte ao cliente. Também podemos usar seus dados para fins analíticos e de marketing.":
                "Wir verwenden Ihre Daten, um Ihre Erfahrung auf unserer Plattform zu verbessern, Updates zu Turnieren und relevanten Angeboten zu senden und Kundensupport zu bieten. Wir können Ihre Daten auch für analytische und Marketingzwecke verwenden.",

            "3. Compartilhamento de Dados": "3. Datenaustausch",
            "Não compartilhamos seus dados pessoais com terceiros, exceto quando necessário para cumprir com a lei, ou com fornecedores de serviços que nos ajudam a operar nossa plataforma.":
                "Wir teilen Ihre persönlichen Daten nicht mit Dritten, es sei denn, dies ist notwendig, um gesetzliche Anforderungen zu erfüllen oder mit Dienstleistern, die uns bei der Betrieb unserer Plattform unterstützen.",

            "4. Segurança": "4. Sicherheit",
            "Adotamos medidas de segurança para proteger seus dados pessoais contra acesso não autorizado, alteração ou destruição. No entanto, não podemos garantir segurança absoluta na transmissão de dados pela internet.":
                "Wir treffen Sicherheitsmaßnahmen, um Ihre persönlichen Daten vor unbefugtem Zugriff, Veränderung oder Zerstörung zu schützen. Wir können jedoch keine absolute Sicherheit bei der Übertragung von Daten über das Internet garantieren.",

            "5. Seus Direitos": "5. Ihre Rechte",
            "Você tem o direito de acessar, corrigir ou excluir seus dados pessoais, bem como solicitar restrições sobre o processamento de seus dados. Para exercer seus direitos, entre em contato conosco através do nosso suporte.":
                "Sie haben das Recht, auf Ihre persönlichen Daten zuzugreifen, sie zu korrigieren oder zu löschen sowie Einschränkungen der Verarbeitung Ihrer Daten zu beantragen. Um Ihre Rechte auszuüben, kontaktieren Sie uns über unseren Support.",

            "6. Alterações na Política de Privacidade": "6. Änderungen der Datenschutzrichtlinie",
            "A CommonLeague se reserva o direito de modificar esta Política de Privacidade a qualquer momento. As alterações serão publicadas nesta página com a data de revisão atualizada.":
                "CommonLeague behält sich das Recht vor, diese Datenschutzrichtlinie jederzeit zu ändern. Änderungen werden auf dieser Seite mit dem aktualisierten Überarbeitungsdatum veröffentlicht.",

            "7. Contato": "7. Kontakt",
            "Se você tiver dúvidas sobre nossa Política de Privacidade, entre em contato conosco pelo e-mail: integradoifspprojeto@gmail.com":
                "Wenn Sie Fragen zu unserer Datenschutzrichtlinie haben, kontaktieren Sie uns bitte per E-Mail unter: integradoifspprojeto@gmail.com",
 "Login failed. Please check your credentials and try again." :  " Anmeldung fehlgeschlagen. Bitte überprüfen Sie Ihre Anmeldedaten und versuchen Sie es erneut."
        }
    },
    ru: {
        translation: {
            "Last updated: 15th October 2024": "Последнее обновление: 15 октября 2024 года",
            "Sign In": "Войти",
            "Sign Up": "Создать аккаунт",
            "Create Account": "Создать аккаунт",
            "Retry Password": "Повторите пароль",
            "Password": "Пароль",
            "Filters": "Фильтры",
            "Filtered Tournaments": "Отфильтрованные турниры",
            "View": "Просмотр",
            "Full Name": "Полное имя",
            "Username": "Имя пользователя",
            "Forgot Your Password?": "Забыли пароль?",
            "Welcome, Friend!": "Добро пожаловать, друг!",
            "Enter your personal details and start your journey with us": "Введите свои персональные данные и начните ваше путешествие с нами",
            "Welcome Back!": "С возвращением!",
            "Email": "Электронная почта",
            "Ongoing Championships": "Текущие чемпионаты",
            "Join the Team": "Присоединиться к команде",
            "Highlights": "Основные моменты",
            "Search by Rank": "Поиск по Рангу",
            "Choose Language": "Выбрать язык",
            "Select a language for translation:": "Выберите язык для перевода:",
            "Select a language": "Выберите язык",
            "Close": "Закрыть",
            "User Name": "Имя пользователя",
            "View Profile": "Просмотреть профиль",
            "To keep connected with us please login with your personal info": "Чтобы оставаться на связи, войдите с вашими личными данными",
            "Ongoing": "В процессе",
            "Finished": "Завершено",
            "Select Captain": "Выбрать капитана",
            "Ban": "Запретить",
            "History": "История",
            "Members": "Члены",
            "Tournaments": "Турниры",
            "Selected Filters": "Выбранные фильтры",
            "Value": "Значение",
            "Matches": "Матчи",
            "Teams": "Команды",
            "Value Ascending": "Значение По Возрастанию",
            "Value Descending": "Значение По Убыванию",
            "Sort By": "Сортировать По",
            "Most Recent": "Самый Новый",
            "Oldest": "Самый Старый",
            "Status": "Статус",
            "Join": "Присоединиться",
            "Chips": "Чипсы",
            "Leader": "Лидер",
            "Leave Team": "Покинуть команду",
            "Privacy Policy": "Политика конфиденциальности",
            "COMMONLEAGUE PRIVACY POLICY": "ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ COMMONLEAGUE",
            "The CommonLeague is committed to protecting the privacy and personal data of its users. This Privacy Policy describes how we collect, use, and protect your personal data in accordance with applicable data protection laws, including the General Data Protection Law (LGPD) in Brazil and the General Data Protection Regulation (GDPR) in the European Union.":
                "CommonLeague обязуется защищать конфиденциальность и личные данные своих пользователей. Эта Политика конфиденциальности описывает, как мы собираем, используем и защищаем ваши личные данные в соответствии с применимыми законами о защите данных, включая Общий закон о защите данных (LGPD) в Бразилии и Общий регламент по защите данных (GDPR) в Европейском Союзе.",
            "1. Coleta de Dados": "1. Сбор данных",
            "Coletamos informações pessoais quando você se registra na nossa plataforma, participa de torneios ou interage com nossos serviços. Isso pode incluir seu nome, endereço de e-mail, dados de pagamento e informações de uso da plataforma.":
                "Мы собираем личную информацию, когда вы регистрируетесь на нашей платформе, участвуете в турнирах или взаимодействуете с нашими сервисами. Это может включать ваше имя, адрес электронной почты, платежные данные и информацию о пользовании платформой.",

            "2. Uso dos Dados": "2. Использование данных",
            "Utilizamos seus dados para melhorar sua experiência em nossa plataforma, enviar atualizações sobre torneios e ofertas relevantes, e fornecer suporte ao cliente. Também podemos usar seus dados para fins analíticos e de marketing.":
                "Мы используем ваши данные для улучшения вашего опыта на нашей платформе, отправки обновлений о турнирах и актуальных предложениях, а также для предоставления поддержки пользователям. Мы также можем использовать ваши данные для аналитики и маркетинга.",

            "3. Compartilhamento de Dados": "3. Обмен данными",
            "Não compartilhamos seus dados pessoais com terceiros, exceto quando necessário para cumprir com a lei, ou com fornecedores de serviços que nos ajudam a operar nossa plataforma.":
                "Мы не передаем ваши личные данные третьим лицам, за исключением случаев, когда это необходимо для соблюдения закона, или с поставщиками услуг, которые помогают нам в работе нашей платформы.",

            "4. Segurança": "4. Безопасность",
            "Adotamos medidas de segurança para proteger seus dados pessoais contra acesso não autorizado, alteração ou destruição. No entanto, não podemos garantir segurança absoluta na transmissão de dados pela internet.":
                "Мы принимаем меры безопасности для защиты ваших личных данных от несанкционированного доступа, изменения или уничтожения. Тем не менее, мы не можем гарантировать абсолютную безопасность при передаче данных через интернет.",

            "5. Seus Direitos": "5. Ваши права",
            "Você tem o direito de acessar, corrigir ou excluir seus dados pessoais, bem como solicitar restrições sobre o processamento de seus dados. Para exercer seus direitos, entre em contato conosco através do nosso suporte.":
                "Вы имеете право получить доступ к своим личным данным, исправить их или удалить, а также запросить ограничение обработки ваших данных. Для осуществления своих прав свяжитесь с нами через нашу службу поддержки.",

            "6. Alterações na Política de Privacidade": "6. Изменения в Политике конфиденциальности",
            "A CommonLeague se reserva o direito de modificar esta Política de Privacidade a qualquer momento. As alterações serão publicadas nesta página com a data de revisão atualizada.":
                "CommonLeague оставляет за собой право в любой момент изменить настоящую Политику конфиденциальности. Изменения будут опубликованы на этой странице с актуальной датой ревизии.",

            "7. Contato": "7. Контакт",
            "Se você tiver dúvidas sobre nossa Política de Privacidade, entre em contato conosco pelo e-mail: integradoifspprojeto@gmail.com":
                "Если у вас есть вопросы по нашей Политике конфиденциальности, свяжитесь с нами по электронной почте: integradoifspprojeto@gmail.com",

                 "Login failed. Please check your credentials and try again." :  "Ошибка входа. Пожалуйста, проверьте свои учетные данные и попробуйте снова."
        }
    },
    ko: {
        translation: {
            "Last updated: 15th October 2024": "마지막 업데이트: 2024년 10월 15일",
            "Sign In": "로그인",
            "Sign Up": "계정 만들기",
            "Create Account": "계정 만들기",
            "Retry Password": "비밀번호 다시 입력",
            "Password": "비밀번호",
            "Full Name": "전체 이름",
            "Username": "사용자 이름",
            "Filters": "필터",
            "Filtered Tournaments": "필터링된 토너먼트",
            "View": "보기",
            "Select Captain": "캡틴 선택",
            "Ban": "금지",
            "History": "기록",
            "Members": "구성원",
            "Forgot Your Password?": "비밀번호를 잊으셨나요?",
            "Welcome, Friend!": "환영합니다, 친구!",
            "Enter your personal details and start your journey with us": "개인 정보를 입력하고 우리와 함께 여행을 시작하세요",
            "Welcome Back!": "다시 오신 것을 환영합니다!",
            "Email": "이메일",
            "Ongoing Championships": "진행 중인 챔피언십",
            "Join the Team": "팀에 가입",
            "Highlights": "하이라이트",
            "Search by Rank": "랭크로 검색",
            "Choose Language": "언어 선택",
            "Select a language for translation:": "번역할 언어를 선택하세요:",
            "Select a language": "언어 선택",
            "Close": "닫기",
            "User Name": "사용자 이름",
            "View Profile": "프로필 보기",
            "To keep connected with us please login with your personal info": "계속 연결하려면 개인 정보로 로그인하세요",
            "Ongoing": "진행 중",
            "Finished": "완료됨",
            "Tournaments": "토너먼트",
            "Selected Filters": "선택된 필터",
            "Value": "값",
            "Matches": "경기",
            "Teams": "팀",
            "Value Ascending": "값 오름차순",
            "Value Descending": "값 내림차순",
            "Sort By": "정렬 기준",
            "Most Recent": "최신순",
            "Oldest": "오래된 순",
            "Status": "상태",
            "Join": "참여",
            "Chips": "칩",
            "Leader": "리더",
            "Leave Team": "팀 탈퇴",
            "Privacy Policy": "개인정보 처리방침",
            "COMMONLEAGUE PRIVACY POLICY": "COMMONLEAGUE 개인정보 처리방침",
            "The CommonLeague is committed to protecting the privacy and personal data of its users. This Privacy Policy describes how we collect, use, and protect your personal data in accordance with applicable data protection laws, including the General Data Protection Law (LGPD) in Brazil and the General Data Protection Regulation (GDPR) in the European Union.":
                "CommonLeague는 사용자들의 개인정보 보호를 약속합니다. 이 개인정보 처리방침은 브라질의 일반 데이터 보호 법(GDPR) 및 유럽 연합의 일반 데이터 보호 규정(GDPR)을 포함한 관련 데이터 보호 법률에 따라 어떻게 개인정보를 수집, 사용 및 보호하는지 설명합니다.",
            "1. Coleta de Dados": "1. 데이터 수집",
            "Coletamos informações pessoais quando você se registra na nossa plataforma, participa de torneios ou interage com nossos serviços. Isso pode incluir seu nome, endereço de e-mail, dados de pagamento e informações de uso da plataforma.":
                "우리는 사용자가 우리 플랫폼에 등록하거나 토너먼트에 참가하거나 우리의 서비스를 사용할 때 개인 정보를 수집합니다. 여기에는 이름, 이메일 주소, 결제 정보 및 플랫폼 사용 정보가 포함될 수 있습니다.",

            "2. Uso dos Dados": "2. 데이터 사용",
            "Utilizamos seus dados para melhorar sua experiência em nossa plataforma, enviar atualizações sobre torneios e ofertas relevantes, e fornecer suporte ao cliente. Também podemos usar seus dados para fins analíticos e de marketing.":
                "우리는 귀하의 데이터를 사용하여 플랫폼에서의 경험을 향상시키고, 토너먼트 및 관련 제안에 대한 업데이트를 보내며, 고객 지원을 제공합니다. 또한 우리는 분석 및 마케팅 목적을 위해 데이터를 사용할 수 있습니다.",

            "3. Compartilhamento de Dados": "3. 데이터 공유",
            "Não compartilhamos seus dados pessoais com terceiros, exceto quando necessário para cumprir com a lei, ou com fornecedores de serviços que nos ajudam a operar nossa plataforma.":
                "우리는 귀하의 개인 데이터를 법을 준수해야 할 필요가 있거나, 플랫폼 운영을 돕는 서비스 제공업체와 협력하는 경우를 제외하고는 제3자와 공유하지 않습니다.",

            "4. Segurança": "4. 보안",
            "Adotamos medidas de segurança para proteger seus dados pessoais contra acesso não autorizado, alteração ou destruição. No entanto, não podemos garantir segurança absoluta na transmissão de dados pela internet.":
                "우리는 귀하의 개인 데이터를 무단 접근, 변경 또는 파괴로부터 보호하기 위해 보안 조치를 취합니다. 그러나 인터넷을 통한 데이터 전송에서 절대적인 보안을 보장할 수는 없습니다.",

            "5. Seus Direitos": "5. 귀하의 권리",
            "Você tem o direito de acessar, corrigir ou excluir seus dados pessoais, bem como solicitar restrições sobre o processamento de seus dados. Para exercer seus direitos, entre em contato conosco através do nosso suporte.":
                "귀하는 귀하의 개인 정보에 접근하거나 수정하거나 삭제할 권리가 있으며, 귀하의 데이터 처리에 대한 제한을 요청할 수 있습니다. 귀하의 권리를 행사하려면 고객 지원을 통해 저희에게 연락해 주세요.",

            "6. Alterações na Política de Privacidade": "6. 개인정보 보호정책 변경",
            "A CommonLeague se reserva o direito de modificar esta Política de Privacidade a qualquer momento. As alterações serão publicadas nesta página com a data de revisão atualizada.":
                "CommonLeague는 언제든지 개인정보 보호정책을 수정할 권리를 보유합니다. 변경 사항은 이 페이지에 업데이트된 개정 날짜와 함께 게시됩니다.",

            "7. Contato": "7. 연락처",
            "Se você tiver dúvidas sobre nossa Política de Privacidade, entre em contato conosco pelo e-mail: integradoifspprojeto@gmail.com":
                "개인정보 보호정책에 대한 질문이 있으시면 이메일로 연락해 주세요: integradoifspprojeto@gmail.com",

                   "Login failed. Please check your credentials and try again." :  "로그인 실패. 자격 증명을 확인하고 다시 시도하세요."
        }
    },
    zh: {
        translation: {
            "Last updated: 15th October 2024": "最后更新：2024年10月15日",
            "Sign In": "登录",
            "Sign Up": "创建账户",
            "Create Account": "创建账户",
            "Retry Password": "重试密码",
            "Password": "密码",
            "Filtered Tournaments": "筛选后的锦标赛",
            "Full Name": "全名",
            "Username": "用户名",
            "Filters": "筛选器",
            "Forgot Your Password?": "忘记密码了吗？",
            "Welcome, Friend!": "欢迎，朋友！",
            "Enter your personal details and start your journey with us": "输入您的个人信息，开始与我们的旅程",
            "Welcome Back!": "欢迎回来！",
            "Email": "电子邮件",
            "View": "查看",
            "Ongoing Championships": "正在进行的锦标赛",
            "Join the Team": "加入团队",
            "Highlights": "亮点",
            "Search by Rank": "按排名搜索",
            "Choose Language": "选择语言",
            "Select a language for translation:": "选择要翻译的语言：",
            "Select a language": "选择语言",
            "Close": "关闭",
            "User Name": "用户名",
            "View Profile": "查看个人资料",
            "To keep connected with us please login with your personal info": "要与我们保持联系，请使用您的个人信息登录",
            "Ongoing": "进行中",
            "Finished": "已完成",
            "Tournaments": "锦标赛",
            "Selected Filters": "选择的筛选器",
            "Value": "值",
            "Matches": "比赛",
            "Teams": "团队",
            "Value Ascending": "值升序",
            "Value Descending": "值降序",
            "Sort By": "排序方式",
            "Most Recent": "最新",
            "Oldest": "最旧",
            "Status": "状态",
            "Join": "加入",
            "Chips": "筹码",
            "Select Captain": "选择队长",
            "Ban": "禁止",
            "History": "历史",
            "Members": "成员",
            "Leader": "领队",
            "Leave Team": "离开队伍",
            "Privacy Policy": "隐私政策",
            "COMMONLEAGUE PRIVACY POLICY": "COMMONLEAGUE 隐私政策",
            "The CommonLeague is committed to protecting the privacy and personal data of its users. This Privacy Policy describes how we collect, use, and protect your personal data in accordance with applicable data protection laws, including the General Data Protection Law (LGPD) in Brazil and the General Data Protection Regulation (GDPR) in the European Union.":
                "CommonLeague承诺保护用户的隐私和个人数据。本隐私政策描述了我们如何根据适用的数据保护法律，包括巴西的《一般数据保护法》（LGPD）和欧盟的《一般数据保护条例》（GDPR），收集、使用和保护您的个人数据。",
            "1. Data Collection": "1. 数据收集",
            "We collect personal information when you register on our platform, participate in tournaments, or interact with our services. This may include your name, email address, payment data, and platform usage information.":
                "当您在我们的平台上注册、参加比赛或与我们的服务互动时，我们会收集您的个人信息。这可能包括您的姓名、电子邮件地址、支付数据和平台使用信息。",

            "2. Use of Data": "2. 数据使用",
            "We use your data to improve your experience on our platform, send updates about tournaments and relevant offers, and provide customer support. We may also use your data for analytical and marketing purposes.":
                "我们使用您的数据来改善您在我们平台上的体验，发送关于比赛和相关优惠的更新，并提供客户支持。我们还可能出于分析和营销目的使用您的数据。",

            "3. Data Sharing": "3. 数据共享",
            "We do not share your personal data with third parties, except when necessary to comply with the law or with service providers who help us operate our platform.":
                "除非为了遵守法律或与帮助我们运营平台的服务提供商共享，否则我们不会将您的个人数据与第三方共享。",

            "4. Security": "4. 安全性",
            "We take security measures to protect your personal data from unauthorized access, alteration, or destruction. However, we cannot guarantee absolute security in the transmission of data over the internet.":
                "我们采取安全措施保护您的个人数据免受未经授权的访问、修改或销毁。然而，我们无法保证通过互联网传输数据的绝对安全。",

            "5. Your Rights": "5. 您的权利",
            "You have the right to access, correct, or delete your personal data, as well as request restrictions on the processing of your data. To exercise your rights, contact us through our support.":
                "您有权访问、纠正或删除您的个人数据，并要求限制数据处理。要行使您的权利，请通过我们的支持与我们联系。",

            "6. Changes to the Privacy Policy": "6. 隐私政策的更改",
            "CommonLeague reserves the right to modify this Privacy Policy at any time. Changes will be posted on this page with the updated review date.":
                "CommonLeague保留随时修改此隐私政策的权利。更改将发布在此页面，并显示更新的修订日期。",

            "7. Contact": "7. 联系方式",
            "If you have any questions about our Privacy Policy, contact us at the email: integradoifspprojeto@gmail.com":
                "如果您对我们的隐私政策有任何疑问，请通过电子邮件与我们联系： integradoifspprojeto@gmail.com",

                   "Login failed. Please check your credentials and try again." :  "登录失败。请检查您的凭据并重试。"

        }
    }
};

i18n.use(languageDetector)
    .use(initReactI18next)
    .init({
        detection: languageDetectorOptions,
        resources,
        fallbackLng: ["en", "pt"],
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
