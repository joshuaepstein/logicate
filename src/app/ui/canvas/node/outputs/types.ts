export enum OutputType {
  LIGHT = 'LIGHT',
  VARIABLE = 'VARIABLE',
}

export const outputTypeToIcon: Record<OutputType, string | ''> = {
  [OutputType.LIGHT]: 'https://logic.ly/demo/assets/light-bulb-thumb-0a93fbda.png',
  [OutputType.VARIABLE]: '',
}
