<script>
    // tags
    export const tags = {
    enfant:         {name: 'Enfant',        color: 'bg-ls-vert-base'},
    arbre:          {name: 'Arbre',         color: 'bg-ls-vert-fonce'},
    chapeau:        {name: 'Chapeau',       color: 'bg-ls-bleu-fonce'},
    rassemblement:  {name: 'Rassemblement', color: 'bg-ls-louveteaux'},
    feu:            {name: 'Feu',           color: 'bg-ls-eclaireurs'},
    groupe:         {name: 'Groupe',        color: 'bg-ls-pionniers'},
    tobogan:        {name: 'Tobogan',       color: 'bg-ls-mondial'},
    danse:          {name: 'Danse',         color: 'bg-ls-prune'},
    drapeau:        {name: 'Drapeau',       color: 'bg-ls-orange'},
    main:           {name: 'Main',          color: 'bg-ls-bleu-clair'},
    assis:          {name: 'Assis',         color: 'bg-ls-rouge'},
    course:         {name: 'Course',        color: 'bg-ls-rose'},
    roche:          {name: 'Roche',         color: 'bg-gray-800'},
    ville:          {name: 'Ville',         color: 'bg-teal-800'},
    flou:           {name: 'Flou',          color: 'bg-indigo-800'},
    brouillard:     {name: 'Brouillard',    color: 'bg-red-800'},
    livre:          {name: 'Livre',         color: 'bg-black'}
    };

    import IMG1 from '@/assets/IMG/7.jfif';
    import IMG2 from '@/assets/IMG/4.jfif';
    import IMG3 from '@/assets/IMG/9.jfif';
    import IMG4 from '@/assets/IMG/10.jfif';
    import IMG5 from '@/assets/IMG/3.jpg';
    import IMG7 from '@/assets/IMG/5.jfif';

    // Définir les bonnes images avec leurs tags correspondants
    export const GoodImages = [
    { imgSrc: IMG1, tags: [tags['enfant'], tags['arbre'], tags['chapeau']] },
    { imgSrc: IMG2, tags: [tags['rassemblement'], tags['arbre']] },
    { imgSrc: IMG3, tags: [tags['feu'], tags['groupe']] },
    { imgSrc: IMG4, tags: [tags['tobogan'], tags['groupe']] },
    { imgSrc: IMG5, tags: [tags['groupe'], tags['danse'], tags['drapeau']] },
    { imgSrc: IMG7, tags: [tags['main'], tags['groupe']] },
    ];

    import IMG11 from '@/assets/IMG/1.webp';
    import IMG12 from '@/assets/IMG/2.jpg';
    import IMG13 from '@/assets/IMG/11.jfif';
    import IMG14 from '@/assets/IMG/8.jfif';
    import IMG15 from '@/assets/IMG/13.jfif';
    import IMG16 from '@/assets/IMG/6.jpeg';

    // Définir les mauvaises images avec leurs tags correspondants
    export const BadImages = [
    { imgSrc: IMG11, tags: [tags['groupe'], tags['assis']] },
    { imgSrc: IMG12, tags: [tags['course'], tags['arbre']] },
    { imgSrc: IMG13, tags: [tags['roche']] },
    { imgSrc: IMG14, tags: [tags['ville']] },
    { imgSrc: IMG15, tags: [tags['livre'], tags['flou']] },
    { imgSrc: IMG16, tags: [tags['brouillard'], tags['arbre']] },
    ];


    export default { tags, GoodImages, BadImages };
</script>