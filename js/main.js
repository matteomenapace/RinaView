var panorama,
    panoTimer,
    panoInterval = 5000,
    spinTimer,
    spinInterval = 20,
    spinIncrement = 0.2,
    div = document.getElementById('street-view'),
    options = 
    {
      position: {lat: 46.1589306, lng: 11.2896368},
      pov: {heading: 100, pitch: 0},
      zoom: 1,
      linksControl: false,
      panControl: false,
      enableCloseButton: false
    }

function initialiseRinaView() 
{
  panorama = new google.maps.StreetViewPanorama(div, options)
  startSpinning()
}

function spin() 
{
  var pov = panorama.getPov()
  pov.heading += spinIncrement
  while (pov.heading > 360.0) 
  {
    pov.heading -= 360.0
    changePano()
  }
  while (pov.heading < 0.0) pov.heading += 360.0
  panorama.setPov(pov)
}

function stopSpinning() 
{
  clearTimeout(spinTimer)
}

function startSpinning() 
{
  stopSpinning()
  spinTimer = setInterval(spin, spinInterval)
}

function changePano()
{
  console.log('changePano')

  var links = panorama.getLinks(),
      nextPano = links[0].pano
      
  panorama.setPano(nextPano)
}

function startChangingPano()
{
  stopChangingPano()
  panoTimer = setInterval(changePano, panoInterval)
}

function stopChangingPano()
{
  clearTimeout(panoTimer)
}



/*function initialiseRinaView() 
{
  var fenway = {lat: 42.345573, lng: -71.098326};
  var map = new google.maps.Map(document.getElementById('map'), 
  {
    center: fenway,
    zoom: 14
  })
  var panorama = new google.maps.StreetViewPanorama(
      document.getElementById('pano'), {
        position: fenway,
        pov: {
          heading: 34,
          pitch: 10
        }
      });
  map.setStreetView(panorama)
}*/