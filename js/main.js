var panorama,
    panoTimer,
    panoInterval = 5000,
    spinRequest,
    spinIncrement = 0.1,
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
  if (pov.heading > 360) changePano()
  while (pov.heading > 360) pov.heading -= 360
  while (pov.heading < 0) pov.heading += 360
  panorama.setPov(pov)
}

function stopSpinning() 
{
  cancelAnimationFrame(spinRequest)
}

function startSpinning() 
{
  spin()
  spinRequest = requestAnimationFrame(startSpinning)
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