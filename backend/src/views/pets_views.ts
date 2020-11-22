import Pet from "../models/Pet";
import imagesView from './images_views';


export default{
    render(pet: Pet){
        return {
            id: pet.id,
            name : pet.name,
            catdog:pet.catdog,
            latitude : pet.latitude,
            longitude : pet.longitude,
            about : pet.about,
            instructions : pet.instructions,
            opening_hours : pet.opening_hours,
            open_on_weekends : pet.open_on_weekends,
            images: imagesView.renderMany(pet.images),
        };
    },

    renderMany(pets: Pet[]){
        return pets.map(pet => this.render(pet));
    }
};