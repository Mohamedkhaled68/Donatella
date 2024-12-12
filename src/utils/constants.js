//******************CONSTANTS***************************

//****************FORMS CONSTANTS

export const initialIndividualRegisterFormValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
};
export const initialOrganizationRegisterFormValues = {
    email: "",
    password: "",
};

export const individualRegisterFormGroupData = [
    {
        label: "First Name",
        type: "text",
        name: "firstName",
        id: "firstName",
        placeholder: "i.e. Davon",
        value: (formValues) => formValues.firstName,
        error: (errors) => errors.firstName,
    },
    {
        label: "Last Name",
        type: "text",
        name: "lastName",
        id: "lastName",
        placeholder: "i.e. Lean",
        value: (formValues) => formValues.lastName,
        error: (errors) => errors.lastName,
    },
    {
        label: "Email",
        type: "email",
        name: "email",
        id: "email",
        placeholder: "i.e. davon@mail.com",
        value: (formValues) => formValues.email,
        error: (errors) => errors.email,
    },
    {
        label: "Password",
        type: "password",
        name: "password",
        id: "password",
        placeholder: "********",
        value: (formValues) => formValues.password,
        error: (errors) => errors.password,
    },
];

export const organizationRegisterFormGroupData = [
    {
        label: "Email",
        type: "email",
        name: "email",
        id: "email",
        placeholder: "i.e. davon@mail.com",
        value: (formValues) => formValues.email,
        error: (errors) => errors.email,
    },
    {
        label: "Password",
        type: "password",
        name: "password",
        id: "password",
        placeholder: "********",
        value: (formValues) => formValues.password,
        error: (errors) => errors.password,
    },
];

// PROFILES FORM

export const initialModelProfileFormValues = {
    birthDate: "",
    gender: "",
    nationality: "",
    skinToneEnum: "",
    hairColorEnum: "",
    eyeColorEnum: "",
    bust: "",
    hips: "",
    waist: "",
    dressSize: "",
    shoeSize: "",
    weight: "",
    height: "",
};

export const modelProfileFormGroupData = [
    {
        label: "BirthDate",
        type: "date",
        name: "birthDate",
        id: "birthDate",
        value: (formValues) => formValues.birthDate,
        // error: (errors) => errors.birthDate,
    },
    {
        label: "Gender",
        type: "select",
        name: "gender",
        id: "gender",
        value: (formValues) => formValues.gender,
        // error: (errors) => errors.gender,
    },
    {
        label: "Nationality",
        type: "select",
        name: "nationality",
        id: "nationality",
        value: (formValues) => formValues.nationality,
        // error: (errors) => errors.lense,
    },
    {
        label: "Skin Tone",
        type: "select",
        name: "skinToneEnum",
        id: "skinToneEnum",
        value: (formValues) => formValues.skinToneEnum,
        // error: (errors) => errors.skinToneEnum,
    },
    {
        label: "Hair Color",
        type: "select",
        name: "hairColorEnum",
        id: "hairColorEnum",
        value: (formValues) => formValues.hairColorEnum,
        // error: (errors) => errors.hairColorEnum,
    },
    {
        label: "Eye Color",
        type: "select",
        name: "eyeColorEnum",
        id: "eyeColorEnum",
        value: (formValues) => formValues.eyeColorEnum,
        // error: (errors) => errors.eyeColorEnum,
    },
    {
        label: "Bust",
        type: "select",
        name: "bust",
        id: "bust",
        value: (formValues) => formValues.bust,
        // error: (errors) => errors.bust,
    },
    {
        label: "Hips",
        type: "select",
        name: "hips",
        id: "hips",
        value: (formValues) => formValues.hips,
        // error: (errors) => errors.hips,
    },
    {
        label: "Waist",
        type: "select",
        name: "waist",
        id: "waist",
        value: (formValues) => formValues.waist,
        // error: (errors) => errors.waist,
    },
    {
        label: "Dress Size",
        type: "select",
        name: "dressSize",
        id: "dressSize",
        value: (formValues) => formValues.dressSize,
        className: "col-span-3",
        // error: (errors) => errors.dressSize,
    },
    {
        label: "Shoe Size",
        type: "select",
        name: "shoeSize",
        id: "shoeSize",
        value: (formValues) => formValues.shoeSize,
        className: "col-span-3",
        // error: (errors) => errors.shoeSize",
    },
    {
        label: "Weight",
        type: "select",
        name: "weight",
        id: "weight",
        value: (formValues) => formValues.weight,
        className: "col-span-3",
        // error: (errors) => errors.weight",
    },
    {
        label: "Height",
        type: "select",
        name: "height",
        id: "height",
        value: (formValues) => formValues.height,
        className: "col-span-3",
        // error: (errors) => errors.height",
    },
];

export const initialVideographerProfileFormValues = {
    camera: "",
    lightning: "",
    lense: "",
    stabilizer: "",
};

export const videographerProfileFormGroupData = [
    {
        label: "Camera owned / used",
        type: "text",
        name: "camera",
        id: "camera",
        placeholder: "i.e. Nikon",
        value: (formValues) => formValues.camera,
        // error: (errors) => errors.camera,
    },
    {
        label: "lightning owned / used",
        type: "text",
        name: "lightning",
        id: "lightning",
        placeholder: "i.e. Nikon",
        value: (formValues) => formValues.lightning,
        // error: (errors) => errors.lightning,
    },
    {
        label: "Lens Used",
        type: "text",
        name: "lense",
        id: "lense",
        placeholder: "i.e. Nikon",
        value: (formValues) => formValues.lense,
        // error: (errors) => errors.lense,
    },
    {
        label: "Stabilizer / gimbal availability",
        type: "select",
        name: "stabilizer",
        id: "stabilizer",
        placeholder: "i.e. Nikon",
        value: (formValues) => formValues.stabilizer,
        // error: (errors) => errors.stabilizer,
    },
];

export const initialPhotographerProfileFormValues = {
    camera: "",
    lightning: "",
    lense: "",
};

export const photographerProfileFormGroupData = [
    {
        label: "Camera owned / used",
        type: "text",
        name: "camera",
        id: "camera",
        placeholder: "i.e. Nikon",
        value: (formValues) => formValues.camera,
        // error: (errors) => errors.camera,
    },
    {
        label: "lightning owned / used",
        type: "text",
        name: "lightning",
        id: "lightning",
        placeholder: "i.e. Nikon",
        value: (formValues) => formValues.lightning,
        // error: (errors) => errors.lighting,
    },
    {
        label: "Lens Used",
        type: "text",
        name: "lense",
        id: "lense",
        placeholder: "i.e. Nikon",
        value: (formValues) => formValues.lense,
        // error: (errors) => errors.lense,
    },
];

export const initialEditorProfileFormValues = {
    editingSoftware: "",
    colorGrading: false,
    soundEditing: false,
    visualEffects: false,
    motionGraphics: false,
};
export const initialOrgProfileFormValues = {
    bio: "",
    name: "",
    location: "",
    instagram: "",
    tiktok: "",
    website: "",
    phone: "",
};

export const OrgProfileFormGroupData = [
    {
        label: "Bio",
        type: "text",
        name: "bio",
        id: "bio",
        placeholder: "i.e. Devion",
        className: "col-span-2",
        value: (formValues) => formValues.bio,
        // error: (errors) => errors.bio,
    },
    {
        label: "Organization Name",
        type: "text",
        name: "name",
        id: "name",
        placeholder: "i.e. Devion",
        value: (formValues) => formValues.name,
        // error: (errors) => errors.name,
    },
    {
        label: "Location",
        type: "select",
        name: "location",
        id: "location",
        placeholder: "i.e. Devion",
        value: (formValues) => formValues.location,
        // error: (errors) => errors.location,
    },
    {
        label: "Instagram",
        type: "text",
        name: "instagram",
        id: "instagram",
        placeholder: "i.e. Devion",
        value: (formValues) => formValues.instagram,
        // error: (errors) => errors.instagram,
    },
    {
        label: "Tiktok",
        type: "text",
        name: "tiktok",
        id: "tiktok",
        placeholder: "i.e. Devion",
        value: (formValues) => formValues.tiktok,
        // error: (errors) => errors.tiktok,
    },
    {
        label: "Website",
        type: "text",
        name: "website",
        id: "website",
        placeholder: "i.e. Devion",
        value: (formValues) => formValues.website,
        // error: (errors) => errors.website,
    },
    {
        label: "Phone Number",
        type: "text",
        name: "phone",
        id: "phone",
        placeholder: "i.e. Devion",
        value: (formValues) => formValues.phone,
        // error: (errors) => errors.phone,
    },
];

export const initialModelImagesValues = {
    profile: null,
    cover: null,
    headshot: null,
    fullBody: null,
};
export const initialRestImagesValues = {
    portfolio1: null,
    portfolio2: null,
    profile: null,
    reel: null,
};

// EXPERIENCE FORM
export const initialExperienceFormValues = {
    bio: "",
    socialAccount: "",
    yearsOfExperience: "",
    availableForTravel: "",
    legallyWorking: "",
    holdingBachelors: "",
    hasWorkExperience: "",
};

export const ExperienceFormGroupData = [
    {
        label: "Bio:",
        type: "text",
        name: "bio",
        id: "bio",
        placeholder: "Type here",
        value: (formValues) => formValues.bio,
        // error: (errors) => errors.bio,
    },
    {
        label: "Link Your Most Followed Social Account:",
        type: "url",
        name: "socialAccount",
        id: "socialAccount",
        placeholder: "Type here",
        value: (formValues) => formValues.socialAccount,
        // error: (errors) => errors.socialAccount,
    },
    {
        label: "How many years of experience do you have?",
        type: "number",
        name: "yearsOfExperience",
        id: "yearsOfExperience",
        placeholder: "Type here",
        value: (formValues) => formValues.yearsOfExperience,
        // error: (errors) => errors.yearsOfExperience,
    },
    {
        label: "Are you available for travel for shoots?",
        type: "select",
        name: "availableForTravel",
        id: "availableForTravel",
        value: (formValues) => formValues.availableForTravel,
        // error: (errors) => errors.availableForTravel,
    },
    {
        label: "Are you legally eligible to work in your location?",
        type: "select",
        name: "legallyWorking",
        id: "legallyWorking",
        value: (formValues) => formValues.legallyWorking,
        // error: (errors) => errors.legallyWorking,
    },
    {
        label: "Do you have tattos?",
        type: "select",
        name: "holdingBachelors",
        id: "holdingBachelors",
        value: (formValues) => formValues.holdingBachelors,
        // error: (errors) => errors.holdingBachelors,
    },
    {
        label: (role) => `Have you worked as a ${role} before?`,
        type: "select",
        name: "hasWorkExperience",
        id: "hasWorkExperience",
        value: (formValues) => formValues.hasWorkExperience,
        // error: (errors) => errors.hasWorkExperience,
    },
];

// JOB POST FORM

export const JobPostFormGroupData = [
    {
        label: "Job Title:",
        type: "text",
        name: "jobTitle",
        id: "jobTitle",
        placeholder: "Type here",
        className: "col-span-2",
        value: (formValues) => formValues.jobTitle,
        // error: (errors) => errors.jobTitle,
    },
    {
        label: "Job Category:",
        type: "text",
        name: "jobCategory",
        id: "jobCategory",
        placeholder: "Type here",
        className: "col-span-2",
        value: (formValues) => formValues.jobCategory,
        // error: (errors) => errors.jobCategory,
    },
    {
        label: "Experience Needed:",
        type: "text",
        name: "experienceNeeded",
        id: "experienceNeeded",
        placeholder: "Type here",
        className: "col-span-2",
        value: (formValues) => formValues.experienceNeeded,
        // error: (errors) => errors.experienceNeeded,
    },
    {
        label: "Career Level:",
        type: "text",
        name: "careerLevel",
        id: "careerLevel",
        placeholder: "Type here",
        className: "col-span-2",
        value: (formValues) => formValues.careerLevel,
        // error: (errors) => errors.careerLevel,
    },
    {
        label: "Job Description:",
        type: "text",
        name: "jobDescription",
        id: "jobDescription",
        placeholder: "Type here",
        value: (formValues) => formValues.jobDescription,
        // error: (errors) => errors.jobDescription,
    },
    {
        label: "Job Requirements:",
        type: "text",
        name: "jobRequirements",
        id: "jobRequirements",
        placeholder: "Type here",
        value: (formValues) => formValues.jobRequirements,
        // error: (errors) => errors.jobRequirements,
    },
];
//************************************************* */

//********ENUMS********

// UserVerificationCodeUseCaseEnum

export const UserVerificationCodeUseCaseEnum = {
    PASSWORD_RESET: "PASSWORD_RESET",
    ACCOUNT_VERIFICATION: "ACCOUNT_VERIFICATION",
};

// UserRoleEnum
export const UserRoleEnum = {
    ADMIN: "ADMIN",
    INDIVIDUAL: "INDIVIDUAL",
    ORGANIZATION: "ORGANIZATION",
};

// IndividualRoleEnum
export const IndividualRoleEnum = {
    MODEL: "MODEL",
    EDITOR: "EDITOR",
    VIDEOGRAPHER: "VIDEOGRAPHER",
    PHOTOGRAPHER: "PHOTOGRAPHER",
};

// IndividualGenderEnum
const IndividualGenderEnum = {
    id: "gender",
    enums: {
        MALE: "MALE",
        OTHER: "OTHER",
        FEMALE: "FEMALE",
    },
};

// SkinToneEnum
const SkinToneEnum = {
    id: "skinToneEnum",
    enums: {
        LIGHT: "LIGHT",
        MEDIUM: "MEDIUM",
        DARK: "DARK",
    },
};

// HairColorEnum
const HairColorEnum = {
    id: "hairColorEnum",
    enums: {
        BLACK: "BLACK",
        BROWN: "BROWN",
        BLONDE: "BLONDE",
        RED: "RED",
    },
};

// EyeColorEnum
const EyeColorEnum = {
    id: "eyeColorEnum",
    enums: {
        BROWN: "BROWN",
        BLUE: "BLUE",
        GREEN: "GREEN",
        HAZEL: "HAZEL",
    },
};

// BustSizeEnum
const BustSizeEnum = {
    id: "bust",
    enums: {
        60: "60cm",
        61: "61cm",
        62: "62cm",
        63: "63cm",
        64: "64cm",
        65: "65cm",
        66: "66cm",
        67: "67cm",
        68: "68cm",
        69: "69cm",
        70: "70cm",
        71: "71cm",
        72: "72cm",
        73: "73cm",
        74: "74cm",
        75: "75cm",
        76: "76cm",
        77: "77cm",
        78: "78cm",
        79: "79cm",
        80: "80cm",
        81: "81cm",
        82: "82cm",
        83: "83cm",
        84: "84cm",
        85: "85cm",
        86: "86cm",
        87: "87cm",
        88: "88cm",
        89: "89cm",
        90: "90cm",
    },
};

// HipSizeEnum
const HipSizeEnum = {
    id: "hips",
    enums: {
        50: "50cm",
        51: "51cm",
        52: "52cm",
        53: "53cm",
        54: "54cm",
        55: "55cm",
        56: "56cm",
        57: "57cm",
        58: "58cm",
        59: "59cm",
        60: "60cm",
        61: "61cm",
        62: "62cm",
        63: "63cm",
        64: "64cm",
        65: "65cm",
        66: "66cm",
        67: "67cm",
        68: "68cm",
        69: "69cm",
        70: "70cm",
        71: "71cm",
        72: "72cm",
        73: "73cm",
        74: "74cm",
        75: "75cm",
        76: "76cm",
        77: "77cm",
        78: "78cm",
        79: "79cm",
        80: "80cm",
        81: "81cm",
        82: "82cm",
        83: "83cm",
        84: "84cm",
        85: "85cm",
        86: "86cm",
        87: "87cm",
        88: "88cm",
        89: "89cm",
        90: "90cm",
    },
};

// WaistSizeEnum
const WaistSizeEnum = {
    id: "waist",
    enums: {
        50: "50cm",
        51: "51cm",
        52: "52cm",
        53: "53cm",
        54: "54cm",
        55: "55cm",
        56: "56cm",
        57: "57cm",
        58: "58cm",
        59: "59cm",
        60: "60cm",
        61: "61cm",
        62: "62cm",
        63: "63cm",
        64: "64cm",
        65: "65cm",
        66: "66cm",
        67: "67cm",
        68: "68cm",
        69: "69cm",
        70: "70cm",
        71: "71cm",
        72: "72cm",
        73: "73cm",
        74: "74cm",
        75: "75cm",
        76: "76cm",
        77: "77cm",
        78: "78cm",
        79: "79cm",
        80: "80cm",
        81: "81cm",
        82: "82cm",
        83: "83cm",
        84: "84cm",
        85: "85cm",
        86: "86cm",
        87: "87cm",
        88: "88cm",
        89: "89cm",
        90: "90cm",
    },
};

// DressSizeEnum
const DressSizeEnum = {
    id: "dressSize",
    enums: {
        10: "10cm",
        11: "11cm",
        12: "12cm",
        13: "13cm",
        14: "14cm",
        15: "15cm",
        16: "16cm",
        17: "17cm",
        18: "18cm",
        19: "19cm",
        20: "20cm",
    },
};

// ShoeSizeEnum
const ShoeSizeEnum = {
    id: "shoeSize",
    enums: {
        20: "20cm",
        21: "21cm",
        22: "22cm",
        23: "23cm",
        24: "24cm",
        25: "25cm",
        26: "26cm",
        27: "27cm",
        28: "28cm",
        29: "29cm",
        30: "30cm",
        31: "31cm",
        32: "32cm",
        33: "33cm",
        34: "34cm",
        35: "35cm",
        36: "36cm",
        37: "37cm",
        38: "38cm",
        39: "39cm",
        40: "40cm",
        41: "41cm",
        42: "42cm",
        43: "43cm",
        44: "44cm",
        45: "45cm",
        46: "46cm",
        47: "47cm",
        48: "48cm",
        49: "49cm",
        50: "50cm",
    },
};

//HieghtEnum
const HeightEnum = {
    id: "height",
    enums: {
        140: "140cm",
        141: "141cm",
        142: "142cm",
        143: "143cm",
        144: "144cm",
        145: "145cm",
        146: "146cm",
        147: "147cm",
        148: "148cm",
        149: "149cm",
        150: "150cm",
        151: "151cm",
        152: "152cm",
        153: "153cm",
        154: "154cm",
        155: "155cm",
        156: "156cm",
        157: "157cm",
        158: "158cm",
        159: "159cm",
        160: "160cm",
        161: "161cm",
        162: "162cm",
        163: "163cm",
        164: "164cm",
        165: "165cm",
        166: "166cm",
        167: "167cm",
        168: "168cm",
        169: "169cm",
        170: "170cm",
        171: "171cm",
        172: "172cm",
        173: "173cm",
        174: "174cm",
        175: "175cm",
        176: "176cm",
        177: "177cm",
        178: "178cm",
        179: "179cm",
        180: "180cm",
        181: "181cm",
        182: "182cm",
        183: "183cm",
        184: "184cm",
        185: "185cm",
        186: "186cm",
        187: "187cm",
        188: "188cm",
        189: "189cm",
        190: "190cm",
        191: "191cm",
        192: "192cm",
        193: "193cm",
        194: "194cm",
        195: "195cm",
        196: "196cm",
        197: "197cm",
        198: "198cm",
        199: "199cm",
        200: "200cm",
    },
};

//WeightEnum
const WeightEnum = {
    id: "weight",
    enums: {
        60: "60kg",
        61: "61kg",
        62: "62kg",
        63: "63kg",
        64: "64kg",
        65: "65kg",
        66: "66kg",
        67: "67kg",
        68: "68kg",
        69: "69kg",
        70: "70kg",
        71: "71kg",
        72: "72kg",
        73: "73kg",
        74: "74kg",
        75: "75kg",
        76: "76kg",
        77: "77kg",
        78: "78kg",
        79: "79kg",
        80: "80kg",
        81: "81kg",
        82: "82kg",
        83: "83kg",
        84: "84kg",
        85: "85kg",
        86: "86kg",
        87: "87kg",
        88: "88kg",
        89: "89kg",
        90: "90kg",
        91: "91kg",
        92: "92kg",
        93: "93kg",
        94: "94kg",
        95: "95kg",
        96: "96kg",
        97: "97kg",
        98: "98kg",
        99: "99kg",
        100: "100kg",
        101: "101kg",
        102: "102kg",
        103: "103kg",
        104: "104kg",
        105: "105kg",
        106: "106kg",
        107: "107kg",
        108: "108kg",
        109: "109kg",
        110: "110kg",
        111: "111kg",
        112: "112kg",
        113: "113kg",
        114: "114kg",
        115: "115kg",
        116: "116kg",
        117: "117kg",
        118: "118kg",
        119: "119kg",
        120: "120kg",
        121: "121kg",
        122: "122kg",
        123: "123kg",
        124: "124kg",
        125: "125kg",
        126: "126kg",
        127: "127kg",
        128: "128kg",
        129: "129kg",
        130: "130kg",
        131: "131kg",
        132: "132kg",
        133: "133kg",
        134: "134kg",
        135: "135kg",
        136: "136kg",
        137: "137kg",
        138: "138kg",
        139: "139kg",
        140: "140kg",
        141: "141kg",
        142: "142kg",
        143: "143kg",
        144: "144kg",
        145: "145kg",
        146: "146kg",
        147: "147kg",
        148: "148kg",
        149: "149kg",
        150: "150kg",
    },
};

// CountryEnum (abbreviated example for brevity)
export const CountryEnum = {
    id: "nationality",
    enums: {
        Afghanistan: "AF",
        AlandIslands: "AX",
        Albania: "AL",
        Algeria: "DZ",
        AmericanSamoa: "AS",
        Andorra: "AD",
        Angola: "AO",
        Anguilla: "AI",
        Antarctica: "AQ",
        AntiguaAndBarbuda: "AG",
        Argentina: "AR",
        Armenia: "AM",
        Aruba: "AW",
        Australia: "AU",
        Austria: "AT",
        Azerbaijan: "AZ",
        Bahamas: "BS",
        Bahrain: "BH",
        Bangladesh: "BD",
        Barbados: "BB",
        Belarus: "BY",
        Belgium: "BE",
        Belize: "BZ",
        Benin: "BJ",
        Bermuda: "BM",
        Bhutan: "BT",
        Bolivia: "BO",
        BonaireSintEustatiusSaba: "BQ",
        BosniaAndHerzegovina: "BA",
        Botswana: "BW",
        BouvetIsland: "BV",
        Brazil: "BR",
        BritishIndianOceanTerritory: "IO",
        BruneiDarussalam: "BN",
        Bulgaria: "BG",
        BurkinaFaso: "BF",
        Burundi: "BI",
        Cambodia: "KH",
        Cameroon: "CM",
        Canada: "CA",
        CapeVerde: "CV",
        CaymanIslands: "KY",
        CentralAfricanRepublic: "CF",
        Chad: "TD",
        Chile: "CL",
        China: "CN",
        ChristmasIsland: "CX",
        CocosKeelingIslands: "CC",
        Colombia: "CO",
        Comoros: "KM",
        Congo: "CG",
        CongoDemocraticRepublic: "CD",
        CookIslands: "CK",
        CostaRica: "CR",
        CoteDIvoire: "CI",
        Croatia: "HR",
        Cuba: "CU",
        "CuraÃ§ao": "CW",
        Cyprus: "CY",
        CzechRepublic: "CZ",
        Denmark: "DK",
        Djibouti: "DJ",
        Dominica: "DM",
        DominicanRepublic: "DO",
        Ecuador: "EC",
        Egypt: "EG",
        ElSalvador: "SV",
        EquatorialGuinea: "GQ",
        Eritrea: "ER",
        Estonia: "EE",
        Ethiopia: "ET",
        FalklandIslands: "FK",
        FaroeIslands: "FO",
        Fiji: "FJ",
        Finland: "FI",
        France: "FR",
        FrenchGuiana: "GF",
        FrenchPolynesia: "PF",
        FrenchSouthernTerritories: "TF",
        Gabon: "GA",
        Gambia: "GM",
        Georgia: "GE",
        Germany: "DE",
        Ghana: "GH",
        Gibraltar: "GI",
        Greece: "GR",
        Greenland: "GL",
        Grenada: "GD",
        Guadeloupe: "GP",
        Guam: "GU",
        Guatemala: "GT",
        Guernsey: "GG",
        Guinea: "GN",
        GuineaBissau: "GW",
        Guyana: "GY",
        Haiti: "HT",
        HeardIslandMcdonaldIslands: "HM",
        HolySeeVaticanCityState: "VA",
        Honduras: "HN",
        HongKong: "HK",
        Hungary: "HU",
        Iceland: "IS",
        India: "IN",
        Indonesia: "ID",
        Iran: "IR",
        Iraq: "IQ",
        Ireland: "IE",
        IsleOfMan: "IM",
        Israel: "IL",
        Italy: "IT",
        Jamaica: "JM",
        Japan: "JP",
        Jersey: "JE",
        Jordan: "JO",
        Kazakhstan: "KZ",
        Kenya: "KE",
        Kiribati: "KI",
        Korea: "KR",
        KoreaDemocraticPeoplesRepublic: "KP",
        Kuwait: "KW",
        Kyrgyzstan: "KG",
        LaoPeoplesDemocraticRepublic: "LA",
        Latvia: "LV",
        Lebanon: "LB",
        Lesotho: "LS",
        Liberia: "LR",
        LibyanArabJamahiriya: "LY",
        Liechtenstein: "LI",
        Lithuania: "LT",
        Luxembourg: "LU",
        Macao: "MO",
        Macedonia: "MK",
        Madagascar: "MG",
        Malawi: "MW",
        Malaysia: "MY",
        Maldives: "MV",
        Mali: "ML",
        Malta: "MT",
        MarshallIslands: "MH",
        Martinique: "MQ",
        Mauritania: "MR",
        Mauritius: "MU",
        Mayotte: "YT",
        Mexico: "MX",
        Micronesia: "FM",
        Moldova: "MD",
        Monaco: "MC",
        Mongolia: "MN",
        Montenegro: "ME",
        Montserrat: "MS",
        Morocco: "MA",
        Mozambique: "MZ",
        Myanmar: "MM",
        Namibia: "NA",
        Nauru: "NR",
        Nepal: "NP",
        Netherlands: "NL",
        NewCaledonia: "NC",
        NewZealand: "NZ",
        Nicaragua: "NI",
        Niger: "NE",
        Nigeria: "NG",
        Niue: "NU",
        NorfolkIsland: "NF",
        NorthernMarianaIslands: "MP",
        Norway: "NO",
        Oman: "OM",
        Pakistan: "PK",
        Palau: "PW",
        PalestinianTerritory: "PS",
        Panama: "PA",
        PapuaNewGuinea: "PG",
        Paraguay: "PY",
        Peru: "PE",
        Philippines: "PH",
        Pitcairn: "PN",
        Poland: "PL",
        Portugal: "PT",
        PuertoRico: "PR",
        Qatar: "QA",
        Reunion: "RE",
        Romania: "RO",
        RussianFederation: "RU",
        Rwanda: "RW",
        SaintBarthelemy: "BL",
        SaintHelena: "SH",
        SaintKittsAndNevis: "KN",
        SaintLucia: "LC",
        SaintMartin: "MF",
        SaintPierreAndMiquelon: "PM",
        SaintVincentAndGrenadines: "VC",
        Samoa: "WS",
        SanMarino: "SM",
        SaoTomeAndPrincipe: "ST",
        SaudiArabia: "SA",
        Senegal: "SN",
        Serbia: "RS",
        Seychelles: "SC",
        SierraLeone: "SL",
        Singapore: "SG",
        SintMaarten: "SX",
        Slovakia: "SK",
        Slovenia: "SI",
        SolomonIslands: "SB",
        Somalia: "SO",
        SouthAfrica: "ZA",
        SouthGeorgiaAndSandwichIsl: "GS",
        SouthSudan: "SS",
        Spain: "ES",
        SriLanka: "LK",
        Sudan: "SD",
        Suriname: "SR",
        SvalbardAndJanMayen: "SJ",
        Swaziland: "SZ",
        Sweden: "SE",
        Switzerland: "CH",
        SyrianArabRepublic: "SY",
        Taiwan: "TW",
        Tajikistan: "TJ",
        Tanzania: "TZ",
        Thailand: "TH",
        TimorLeste: "TL",
        Togo: "TG",
        Tokelau: "TK",
        Tonga: "TO",
        TrinidadAndTobago: "TT",
        Tunisia: "TN",
        Turkey: "TR",
        Turkmenistan: "TM",
        TurksAndCaicosIslands: "TC",
        Tuvalu: "TV",
        Uganda: "UG",
        Ukraine: "UA",
        UnitedArabEmirates: "AE",
        UnitedKingdom: "GB",
        UnitedStates: "US",
        UnitedStatesOutlyingIslands: "UM",
        Uruguay: "UY",
        Uzbekistan: "UZ",
        Vanuatu: "VU",
        Venezuela: "VE",
        Vietnam: "VN",
        VirginIslandsBritish: "VG",
        VirginIslandsUS: "VI",
        WallisAndFutuna: "WF",
        WesternSahara: "EH",
        Yemen: "YE",
        Zambia: "ZM",
        Zimbabwe: "ZW",
    },
};

export const onBoardingEnums = [
    { ...IndividualGenderEnum },
    { ...SkinToneEnum },
    { ...HairColorEnum },
    { ...EyeColorEnum },
    { ...BustSizeEnum },
    { ...DressSizeEnum },
    { ...ShoeSizeEnum },
    { ...HeightEnum },
    { ...WeightEnum },
    { ...HipSizeEnum },
    { ...WaistSizeEnum },
    { ...CountryEnum },
];

// ChatTypeEnum
export const ChatTypeEnum = {
    PRIVATE: "PRIVATE",
    GROUP: "GROUP",
};

// SubScriptionTopicsEnum
export const SubScriptionTopicsEnum = {
    ONLINE_STATUS: "ONLINE_STATUS",
    TYPING_STATUS: "TYPING_STATUS",
    CREATE_MESSAGE: "CREATE_MESSAGE",
    UPDATE_MESSAGE: "UPDATE_MESSAGE",
    DELETE_MESSAGE: "DELETE_MESSAGE",
    DELIVERED_MESSAGE: "DELIVERED_MESSAGE",
    SEEN_MESSAGE: "SEEN_MESSAGE",
};

// ClientEventsEnum
export const ClientEventsEnum = {
    MY_TYPING_STATUS: "MY_TYPING_STATUS",
    MY_SEEN_MESSAGE: "MY_SEEN_MESSAGE",
};
//************************************************************
