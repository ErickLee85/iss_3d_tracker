(async function() {
const iss_api = 'http://api.open-notify.org/iss-now.json'
const apiKey = 'f7ebedf3b11a474b8a45dc33245eb548'
const nasaApiKey = 'fbIUMAB6ztsFdSfkMsbR5cBDvBbWDSNLcfxaL2UD'
let lat;
let long;

const getLocation = async (lat, long) => {
  const req = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&apiKey=${apiKey}`
      try{
          const locationResponse = await fetch(req, { method: 'GET'})
            const locationData = await locationResponse.json();
            const dataObject = {
                title: `ISS Current Position (${new Date().toLocaleTimeString()})`,
                location: locationData.features[0].properties.name || '',
                latitude: lat,
                longitude: long,
                distance: locationData.features[0].properties?.distance || 0,
                country: locationData.features[0].properties?.country || '', 
                state: locationData.features[0].properties?.state || '',
                city: locationData.features[0].properties?.city || '',
                timezone: locationData.features[0].properties.timezone.name,
                offset: locationData.features[0].properties.timezone.offset_STD
            }
            console.table(dataObject)
      } catch(e) {
        console.warn(e.message)
      } finally {
        
      }
}

try{
    console.log('Fetching coordinates..')
    const response = await fetch(iss_api)
    if(response.status === 200) {
        const { iss_position } = await response.json();
        lat = iss_position.latitude;
        long = iss_position.longitude
        await getLocation(lat, long)
    } 
    else throw new Error('Something went really, really wrong...')

} catch(e) {
    console.warn(e.message)
} finally {
    console.log('Fetch request complete.')
}



})();
