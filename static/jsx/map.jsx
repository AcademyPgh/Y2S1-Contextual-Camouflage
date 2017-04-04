import React from 'react';
import {Image} from 'react-bootstrap';
/* Home Component being sent to app.jsx in order to be rendered by index.html */
const Home = () =>
(
  <div>
    <div id= "map">

    {/* <Image src= "{{ url_for('static', filename='img/C_Camo_Map.png')}}" alt="map" responsive/> */}
    <Image src= "img/C_Camo_Map.png" alt="map" responsive/>

    </div>

</div>
);

export default Home;
