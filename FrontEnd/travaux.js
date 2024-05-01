/* global Chart */ 

//This function will create html elements that the browser will use to generate the page. 

export function genererGalerie(listWorks) 
{
    
    // Remove the old static gallery 
    const sectionGallery = document.querySelector(".gallery");
    sectionGallery.textContent = "";

    // Generated the dynamic gallery
    for (let i = 0; i < listWorks.length; i++)
    {
        //Retrieves each element of the table
        const listeTravaux = listWorks[i]; 

        // Create tag figure
        const FigureElement = document.createElement("figure");

        // Create of tag img and figcation
        const Image = document.createElement("img");
        Image.src = listeTravaux.imageUrl;
        Image.alt = listeTravaux.title;

        const FigCaption = document.createElement("figcaption");
        FigCaption.innerText = listeTravaux.title;

        //Add img and figcaption in figure tag
        FigureElement.appendChild(Image);
        FigureElement.appendChild(FigCaption); 

        //Add figure tag in parent div tag
        sectionGallery.appendChild(FigureElement); 

    }

}

