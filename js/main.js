var panorama,
    timer,
    interval = 20,
    increment = 0.2,
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

function spinIt() 
{
  var pov = panorama.getPov()
  pov.heading += increment
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
  clearTimeout(timer)
}

function startSpinning() 
{
  clearTimeout(timer)
  timer = setInterval('spinIt()', interval)
}

function changePano()
{
  var links = panorama.getLinks(),
      nextPano = links[0].pano
      
  panorama.setPano(nextPano)
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