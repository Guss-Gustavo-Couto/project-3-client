function GalleryCard(props) {
    return (
        // FAZER IF / ELSE PARA SÒ MOSTRAR SE O {props.gallery.isaproved} for = Verdadeiro
      <div className="GalleryCard">
        <h3>{props.gallery.title}</h3>
        <img src="{props.gallery.image}"></img>
        <p>{props.gallery.description}</p>
        <a href="{props.gallery.link}">VISIT WEB SITE</a>
        <p>MAP REVIEWS</p>
      </div>
    );
  }
   
  export default GalleryCard;