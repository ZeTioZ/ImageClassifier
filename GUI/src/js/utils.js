

export function until(condition) {
  const poll = resolve => {
    if (condition()) resolve();
    else setTimeout(() => poll(resolve), 400);
  }

  return new Promise(poll);
}

