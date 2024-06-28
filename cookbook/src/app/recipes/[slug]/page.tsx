import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client, sanityFetch } from "@/sanity/client";
import Link from "next/link";
import Image from "next/image";
import "@/app/styles.css";

const RECIPE_QUERY = `*[_type == "recipe" &&
    slug.current == $slug][0]{ title, image, instructions, description}`;
const INGREDIENT_QUERY = `*[_type == "recipe" &&
    slug.current == $slug][0]{ "ingredientTitle":ingredients[0..100]{ingredient->{title}, unit, amount}}`;

const { projectId, dataset } = client.config();

const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

interface Ingredient {
  amount: string;
  unit: string;
  ingredient: {
    title: string;
  };
}

export default async function RecipePage({
  params,
}: {
  params: { slug: string };
}) {
  const recipe = await sanityFetch<SanityDocument>({
    query: RECIPE_QUERY,
    params,
  });

  const ingredientlist = await sanityFetch<SanityDocument>({
    query: INGREDIENT_QUERY,
    params,
  });

  const { title, image, instructions, description } = recipe;
  const { ingredientTitle } = ingredientlist;

  const recipeImageUrl = image
    ? urlFor(image)?.width(300).height(300).url()
    : null;

  // Debugging logs
  console.log("Recipe Data:", recipe);
  console.log("Ingredient List:", ingredientlist);
  console.log("Ingredients List:", ingredientTitle);
  console.log("Instructions:", instructions);

  return (
    <>
      <nav>
        <Link href="/">← Back to main</Link>
      </nav>

      <main className="main">
        <div className="gridcontainer"></div>
        <div className="gridcontainer">
          <div className="">
            <Image
              src={recipeImageUrl || "https://via.placeholder.com/300x300"}
              alt={title}
              className=""
              width="300"
              height="300"
            />

            <h2>Ingredients</h2>
            {ingredientTitle && ingredientTitle.length > 0 ? (
              ingredientTitle.map((ingredient: Ingredient, index: number) => (
                <p key={index}>
                  {ingredient.amount} {ingredient.unit}{" "}
                  <b>{ingredient.ingredient.title}</b>
                </p>
              ))
            ) : (
              <p>No ingredients found.</p>
            )}
          </div>
          <div className="">
            {title ? <h1 className="">{title}</h1> : null}
            <p>{description}</p>

            <h2>Cooking instructions</h2>
            {Array.isArray(instructions) && instructions.length > 0 ? (
              <div className="">
                {instructions.map((instruction, index) => (
                  <p key={index}>{instruction}</p>
                ))}
              </div>
            ) : (
              <p>
                {typeof instructions === "string"
                  ? instructions
                  : "No instructions found."}
              </p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
