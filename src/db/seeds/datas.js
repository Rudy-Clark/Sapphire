const bcrypt = require('bcryptjs');

exports.seed = knex =>
  // Deletes ALL existing entries
  knex('posts')
    .del()
    .then(() =>
      knex('users')
        .del()
        .then(() => {
          const salt = bcrypt.genSaltSync();
          const hash = bcrypt.hashSync('123', salt);
          return knex('users').insert({
            username: 'admin',
            password: hash,
            email: 'admin@admin.ru',
            admin: true,
          });
        })
        .then(() => {
          const salt = bcrypt.genSaltSync();
          const hash = bcrypt.hashSync('123', salt);
          return knex('users').insert({
            username: 'Rudy',
            password: hash,
            email: 'rudy@rudy.ru',
          });
        }),
    )
    .then(() =>
      knex('posts').insert({
        author_id: 1,
        title: 'Алмазы',
        content: `Алмаз — минерал, который представляет собой одну из аллотропных модификаций углерода. Без доступа воздуха алмаз постепенно переходит в графит, кристаллическая решетка которого отличается от строения алмаза.
        По шкале Мооса (шкала твердости минералов) алмаз — самый крепкий минерал (для сравнения, наименьшей твердостью обладает тальк, который легко царапается ногтем, тогда как алмаз способен разрезать стекло).
        Алмаз также отличается большим показателем преломления и высокой прозрачностью, что делает ограненный минерал одним из самых ценных драгоценных камней.
        Несмотря на свою редкость, алмазы добывались на всех континентах, кроме Антарктиды. Образование алмазов до сих пор вызывает вопросы у научного сообщества: существуют магматическая, мантийная, метеоритная и другие теории происхождения алмазов. Известно, что большинство природных алмазов образуются при высоких температуре и давлении на глубине от 140 до 190 километров в земной мантии. Возраст алмазов также неизвестен. По некоторым данным, он может составлять от 100 миллионов до 3,3 миллиардов лет.
        Алмазоносные породы встречаются в основном в кимберлитовых (до 90%) и лампроитовых трубках. Первые представляют собой конусообразные месторождения, возникшие при извержении древних вулканов. Они наполнены обломками вулканических пород и кимберлитами — алмазосодержащей породой. Самые крупные кимберлитовые трубки в мире находятся на территории России. Первую кимберлитовую трубку на территории Якутии открыла советский геолог Лариса Попугаева в 1954 году. Также залежи кимберлита есть в Южной и Центральной Африке, Индии, Канаде, Австралии и Латинской Америке.`,
      }),
    )
    .then(() =>
      knex('posts').insert({
        author_id: 1,
        title: 'Хризолит',
        content: `Хризолит — это камень, который поглощает энергетику своего обладателя и после этого не желает взаимодействовать с любым другим человеком. Есть мнение, что если хризолит попадает в руки нового хозяина, то это может привести к потускнению и даже растрескиванию самоцвета.
        В литотерапии минерал используется в лечении неврозов, депрессии, раздражительности, необоснованных страхов и т. д. Хризолит также помогает человеку избавиться от кошмарных сновидений. Мужчинам этот камень помогает вернуть здоровье мочеполовой системы.
        По знаку зодиака этот камень рекомендуется носить Львам, Девам, Близнецам, Весам и Рыбам. По гороскопу этот самоцвет дарит людям внутреннее спокойствие и уверенность в своей привлекательности. Остальным знакам зодиака также можно носить хризолит, ведь его энергетика не может навредить ни одному человеку.
        Изделия с хризолитом предложены в огромном количестве вариаций. Прежде всего это касается украшений, изготовленных лишь из хризолита. Это броши, ожерелья, подвески и браслеты, среди которых каждый человек сможет выбрать то украшение, которое идеально подойдет ему или его близким.
        Бусы из хризолита — это не только красивое, но и энергетически сильное украшение, которое имеет не только привлекательный вид, но и доступную цену. Бусины, из которых состоят такие изделия, могут иметь самую разную форму. В одном из магазинов бижутерии, находящемся в России, цена на бусы из хризолита колеблется от 5000 до 17000 рублей. На цену влияет количество и размер бусин, а также длина изделия.
        В ювелирных магазинах покупателям предлагаются разные украшения со вставками, представленными хризолитами. Это элегантные браслеты, кулоны, серьги, кольца и другие изделия, изготовленные из серебра и золота.
        Хризолит в серебре характеризуется более высоким спросом по сравнению с золотыми изделиями, инструктированными тем же камнем. Причиной такого явления можно назвать то, что серебро идеально подчеркивает благородный цвет камня. Кроме того, серебряные изделия с камнями стоят в несколько раз дешевле в сравнении с золотыми. К примеру, сережки массой 9 граммов, изготовленные из серебра пробы 925 и инструктированные хризолитами, обойдутся покупателю в 3900 рублей. Если на украшении есть и другие самоцветы, то, естественно, его цена будет выше.
        Золотые серьги с хризолитом (проба металла 585) массой 3,7 грамма стоят 10000-15000 рублей. Наиболее дешевыми будут считаться золотые сережки-пуссеты — их можно приобрести за 6000-7000 рублей.
        С точки зрения магических и лечебных свойств, хризолит полезно носить как в серебре, так и в золоте, причем это могут быть любые модели изделий.
        Что касается определения подделки камня хризолита, то самостоятельно выявить фальшивку можно лишь в том случае, если она изготовлена из окрашенного в зеленый цвет стекла или пластмассы. К примеру, если попробовать провести по такому камню острием иглы, то на его поверхности сразу же появится царапина. Стеклянный или пластмассовый камень будет мгновенно нагреваться от тепла рук человека, что нехарактерно для натурального самоцвета. Равномерный окрас также считается особенностью камня-подделки, ведь в природе хризолиты обладают зональной расцветкой. Если рассматривать фальшивые бусы из хризолита, то можно отметить такую особенность — внутренняя часть бусин имеет светлый оттенок, который значительно отличается от цвета поверхности камней хризолитов.
        Следует учесть то, что украшения с настоящими, а не синтетическими хризолитами, предлагаются покупателям в известных ювелирных салонах, а также на выставках минералов и аукционах. Чтобы защитить себя от приобретения подделки, рекомендуется отказаться от сотрудничества с лицами, которые занимаются незаконной продажей драгоценностей и других изделий с самоцветами.`,
      }),
    )
    .then(() =>
      knex('posts').insert({
        author_id: 1,
        title: 'Корунд',
        content: `КОРУНД, минерал, оксид алюминия Al2O3 (кристаллический глинозем). Название древнеиндийского происхождения (вероятно, от санскритского «каурунтака» или тамильского «курундам» – так именовали этот минерал в Индии и на Цейлоне; возможно, от санскритского «курувинда» – рубин). Цвет корунда обычно синевато- или желтовато-серый; чистый корунд белый, он окрашивается в разные цвета (красный, красно-коричневый, фиолетовый, синий или голубой, от желтого до оранжевого, зеленый) примесями элементов-хромофоров: хрома, железа, титана или ванадия. Цвета нередко чистые, яркие. Обычный корунд просвечивает, ювелирные разности прозрачны. Блеск от стеклянного до алмазного («алмазный шпат» с четко проявленной отдельностью параллельно базису кристаллов). Твердость 9 (эталонный минерал шкалы Мооса, уступающий в твердости только алмазу), плотность 4. Излом от раковистого до неровного. Сингония тригональная. Кристаллы весьма характерны; обычно они бочонковидные, таблитчатые, столбчатые (шестигранно-призматические), короткостолбчатые, реже конусообразные бипирамидальные. Часто встречается в массивных мелкозернистых агрегатах с выраженной тенденцией к псевдокубической отдельности.
        Для образования корунда необходимы условия дефицита кремнезема и высокого содержания глинозема. Магматический акцессорный корунд встречается в сиенитах и нефелиновых сиенитах, в более крупных кристаллах присутствует в щелочных пегматитах. Иногда образуется в результате десиликации (потери кварца) гранитных пегматитов, залегающих в ультраосновных породах. Известен как продукт метаморфизма бокситов и других высокоглиноземистых пород. Развит в глубокометаморфизированных породах типа гнейсов, кристаллических сланцев, гранатовых амфиболитов, а также в мраморах. В зонах контактового метаморфизма высокоглиноземистых осадочных пород могут образоваться наждаки – тонкозернистые смеси корунда с магнетитом, гематитом, иногда со шпинелью, диаспором, хрупкими слюдами, гранатом и другими минералами.
        Благодаря высокой твердости корунд издавна использовался как абразивный материал, но в настоящее время в этих целях применяется в основном искусственный корунд. Наждак и поныне употребляется как абразив для шлифовальных кругов; с этой целью его добывают на древнейшем (известном с античных времен) месторождении на острове Наксос в Кикладском архипелаге (Эгейское море, Греция), а также в США (Честер, шт. Массачусетс; близ Пикскила, шт. Нью-Йорк). В России месторождение наждака (несколько отличного по составу) расположено в Красноярском крае. Крупнейшее корундовое месторождение Семиз-Бугу находится в Казахстане.
        Прозрачные цветные корунды, без трещин (или почти без них), представляют собой дорогие ювелирные (драгоценные) камни. Красные корунды, окрашенные примесью хрома, называются рубинами, синие, окрашенные примесью железа и отчасти титана, – сапфирами. Так же называют и прозрачные корунды других цветов (кроме красного), в том числе бесцветный корунд – лейкосапфир. Некоторые разновидности сапфира и рубина, обработанные кабошоном, обнаруживают в направлении главной (вертикальной) кристаллографической оси эффект астеризма: в них появляется фигура правильной 6- или 12-лучевой звезды, лучи которой перемещаются по поверхности камня при его повороте. Такие камни – звездчатые сапфиры и звездчатые рубины – называют астериями, и они весьма высоко ценятся.
        В настоящее время в промышленных масштабах производится искусственный корунд, включая его ювелирные разновидности – рубины и сапфиры разных цветов, а также звездчатые рубины и сапфиры. Искусственный рубин, получаемый в основном методом Вернейля (плавлением порошка глинозема в пламени водородно-кислородной горелки) или методом Чохральского (вытягиванием из расплава), нашел применение как материал для твердотельных лазеров, часовых камней, осей и цапф точных приборов, а также в ювелирном деле. Искусственные сапфиры используются в осветительной технике (особенно лейкосапфир) и в ювелирной промышленности.`,
      }),
    )
    .then(() =>
      knex('pages').insert({
        name: 'home',
        title: 'Title of a longer featured blog post',
        subtitle: `Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.`,
        wallpaper: '/images/wallpaper.jpg',
      }),
    )
    .then(() =>
      knex('images').insert([
        {
          post_id: 1,
          xs: 'diamondsXS.png',
          md: 'diamondsMD.png',
          lg: 'diamondsLG.png',
        },
        {
          post_id: 2,
          xs: 'hrizolitXS.png',
          md: 'hrizolitMD.png',
          lg: 'hrizolitLG.png',
        },
        {
          post_id: 3,
          xs: 'corundumXS.png',
          md: 'corundumMD.png',
          lg: 'corundumLG.png',
        },
      ]),
    );
