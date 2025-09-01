

export const isValidEmail = (email: string): boolean => {
    if(email=="") return true
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

type PasswordValidator  = {
    valid: boolean,
    errors: string[]
}

export const isValidPassword = (password: string): PasswordValidator => {
    const errors: string[] = [];

    if(password.length < 8) errors.push("Password must be at least 8 characters");
    if(!/[A-Z]/.test(password)) errors.push("Password must contain at least one uppercase");
    if(!/\d/.test(password)) errors.push("Password must contain at least one number");
    if(!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push("Password must contain at least one special character");
    
    return {
        valid: errors.length === 0,
        errors
    };
};
type pubgIdValidator = {
    valid: boolean,
    errors: string[]
}

export const validPubgId = (pubgId: string): pubgIdValidator => {
    const errors: string[] = []
    if(pubgId === "" || pubgId === " ") errors.push("Pubg ID can't be empty")
    if((pubgId.length > 9 || pubgId.length < 9) && pubgId !== "") errors.push("Invalid Pubg ID")
    if(/[A-Z]/.test(pubgId) || /[a-z]/.test(pubgId)) errors.push("ID must be only numbers")
    return {
        valid: errors.length === 0,
        errors
    }
}

type UsernameValidator  = {
    validUsername: boolean,
    usernameErrors: string[]
}
export const isValidUsername = (username: string): UsernameValidator => {
    const errors: string[] = []
    const bannedPatterns = [
        /^admin$/i,
        /^root$/i,
        /^system$/i,
        /^superuser$/i,
        /^owner$/i,
        /^support$/i,
        /^moderator$/i,
        /^mod$/i,
        /^staff$/i,
        /^test[0-9]*$/i,
        /^fuck.*/i,
        /^shit.*/i,
        /^bitch.*/i,
        /^cunt.*/i,
        /^nigg.*/i,
        /^fag.*/i,
        /^whore.*/i,
        /^slut.*/i,
        /^cock.*/i,
        /^dick.*/i,
        /^facebook$/i,
        /^twitter$/i,
        /^instagram$/i,
        /^google$/i,
        /^youtube$/i,
        /^twitch$/i,
        /^paypal$/i,
        /^elonmusk$/i,
        /^president$/i,
        /^[0-9]{6,}$/i,        // all digits longer than 6
        /^(.)\1{4,}$/i,        // same character repeated 5+ times
        /^.{0,2}$/i,           // too short usernames

    ];

    if(username.length < 4) errors.push("Username must be at least 4 characters long")
    if(bannedPatterns.some((pattern) => pattern.test(username))) errors.push("Username not allowed")

    return {
        validUsername: errors.length === 0,
        usernameErrors: errors
    }
}
export function isValidDate(dateStr: string) {
  // Primero: formato básico MM/DD/YYYY
  const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d\d$/;
  if (!regex.test(dateStr)) return false;

  // Dividir
  const [month, day, year] = dateStr.split('/').map(Number);
  const date = new Date(year, month - 1, day);

  // Validar que la fecha sea correcta
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return false;
  }

  // Validar que sea una fecha futura (mañana en adelante)
  const today = new Date();
  today.setHours(0, 0, 0, 0); // quitar horas para comparar solo fecha

  return date > today;
}

export function validateTime(time: string) {
  // Expresión regular para HH:MM AM/PM
  const regex = /^(0?[1-9]|1[0-2]):([0-5][0-9])\s(AM|PM)$/i;

  if (!regex.test(time)) {
    return false;
  }

  return true;
}
export function maxTeamsValidator(map: string, teamSize: string){
    if(map === "Erangel" || map === "Rondo" || map === "Miramar" || map === "Sanhok"){
        if(teamSize === "4") return "25"
        if(teamSize === "2") return "50"
        if(teamSize === "1") return "100"
    }
    if(map === "Livik"){
        if(teamSize === "4") return "13"
        if(teamSize === "2") return "26"
        if(teamSize === "1") return "52"
    }
    return "Invalid"
}