
export interface SwapTransaction {
  id: string
  date: string
  member: string
  amount: number
  direction: 'SWAP_IN' | 'SWAP_OUT'
  multiple: number
  card: string
}

export function parseSwapData(rawData: string): SwapTransaction[] {
  const lines = rawData.trim().split('\n')
  const header = lines[0].split('\t')
  
  return lines.slice(1).map((line, index) => {
    const values = line.split('\t')
    return {
      id: `swap-${index + 1}`,
      date: values[0] || '',
      member: values[1] || '',
      amount: parseFloat(values[2]) || 0,
      direction: values[3] as 'SWAP_IN' | 'SWAP_OUT',
      multiple: parseFloat(values[4]) || 0,
      card: values[5] || ''
    }
  })
}
