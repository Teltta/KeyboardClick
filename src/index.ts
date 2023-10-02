import { settings } from "replugged";

interface soundSet {
  keyboard: HTMLAudioElement[];
  spacebar: HTMLAudioElement[];
  backspace: HTMLAudioElement[];
}

const sounds: soundSet = {
  keyboard: [
    new Audio("https://raw.githubusercontent.com/Teltta/KeyboardClick/main/sounds/keyboard1.mp3"),
    new Audio("https://raw.githubusercontent.com/Teltta/KeyboardClick/main/sounds/keyboard2.mp3"),
    new Audio("https://raw.githubusercontent.com/Teltta/KeyboardClick/main/sounds/keyboard3.mp3"),
  ],
  spacebar: [
    new Audio("https://raw.githubusercontent.com/Teltta/KeyboardClick/main/sounds/spacebar1.mp3"),
    new Audio("https://raw.githubusercontent.com/Teltta/KeyboardClick/main/sounds/spacebar2.mp3"),
    new Audio("https://raw.githubusercontent.com/Teltta/KeyboardClick/main/sounds/spacebar3.mp3"),
  ],
  backspace: [
    new Audio("https://raw.githubusercontent.com/Teltta/KeyboardClick/main/sounds/backspace1.mp3"),
  ],
};

export interface SettingsType {
  volume: number;
  blacklistedKeys: string;
}

export const cfg = await settings.init<SettingsType>("dev.Teltta.KeyboardClick", {
  volume: 50,
  blacklistedKeys:
    "ControlLeft ControlRight CapsLock AltLeft AltRight ShiftLeft ShiftRight ArrowUp ArrowDown ArrowRight ArrowLeft",
});

export function start(): void {
  document.addEventListener("keydown", handleClick);
}

function handleClick(key: KeyboardEvent): void {
  if (
    // @ts-expect-error >:3
    cfg
      .get("blacklistedKeys")
      .split(" ")
      .some((k) => key.code == k)
  )
    return;

  if (key.code == "Backspace") {
    const s = sounds.backspace;
    playSound(s[Math.floor(Math.random() * s.length)]);
  } else if (key.code == "Space") {
    const s = sounds.spacebar;
    playSound(s[Math.floor(Math.random() * s.length)]);
  } else {
    const s = sounds.keyboard;
    playSound(s[Math.floor(Math.random() * s.length)]);
  }
}

function playSound(sound: HTMLAudioElement): void {
  sound.currentTime = 0;
  sound.volume = cfg.get("volume", 50) / 100;
  void sound.play();
}

export function stop(): void {
  document.removeEventListener("keydown", handleClick);
}

export { Settings } from "./Settings";
