'use server'

export const getUserInfo = async (user: string) =>{
  try {
    const query = await fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${process.env.STEAM_WEB_API_KEY}&format=json&steamids=${user}`)
    const response = await query.json()
    const username = response.response.players[0].personaname;
    const avatar = response.response.players[0].avatar;

    return {username, avatar}
  } catch (err) {
    console.log(err)
  }
}

export const getTimetable = async (serverCode: string, trainNumber: string) =>{
  try {
    const query = await fetch(`https://api1.aws.simrail.eu:8082/api/getAllTimetables?serverCode=${serverCode}&train=${trainNumber}`)
    const response = await query.json()

    return {response}
  } catch (err) {
    console.log(err)
  }
}

export const getMapInfo = async (link: string) =>{
  try {
    const query = await fetch(link)
    const response = await query.json()

    return response
  } catch (err) {
    console.log(err)
  }
}

