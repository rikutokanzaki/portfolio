type PromptElements = {
  prompt: string,
  cwd: string,
  promptSymbol: string,
}

export const combinePromptElements = ({ prompt, cwd, promptSymbol }: PromptElements) => {
  const shellPrompt = `${prompt}${cwd}${promptSymbol} `

  return shellPrompt;
};
