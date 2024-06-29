import "./styles.css";
import Link from "next/link";
import { SanityDocument } from "next-sanity";
import { sanityFetch } from "@/sanity/client";
import Contact from "@/components/contact";

const RECIPE_QUERY = `*[_type == "recipe"]{_id, title, slug, description}`;

export default async function IndexPage() {
  let recipes: SanityDocument[] = [];

  try {
    recipes = await sanityFetch<SanityDocument[]>({ query: RECIPE_QUERY });
  } catch (error) {
    console.error("Failed to fetch recipes:", error);
  }

  return (
    <>
      <main className="main">
        <div>
          <h1>Cookbook recipes</h1>
          <p>
            Welcome, culinary adventurers and kitchen warriors! Are you ready to
            embark on a gastronomic journey that promises laughter, unexpected
            discoveries, and perhaps a few minor kitchen disasters? Whether
            you're a seasoned chef or someone who considers microwaving a bag of
            popcorn to be a culinary triumph, this recipe guide is here to help
            and entertain you.
          </p>

          <p>
            Imagine your kitchen as a battleground, your utensils as your trusty
            weapons, and your ingredients as the colorful cast of characters in
            this epic saga of taste. Together, we'll slice, dice, and sauté our
            way to culinary glory. Or at least avoid setting off the smoke
            alarm—baby steps, right?
          </p>

          <p>
            So, grab your apron, sharpen those knives or just find a butter
            knife that isn't too dull, and get ready to create something
            delicious, or at the very least, edible. Remember, the secret
            ingredient is always a dash of humor and a sprinkle of enthusiasm.
            Let’s cook up a storm and stir up some fun!
          </p>

          <p>Bon appétit and happy cooking!</p>
          <ul className="list">
            {recipes.length > 0 ? (
              recipes.map((recipe) => (
                <li key={recipe._id}>
                  <div className="list-element">
                    {recipe.slug?.current ? (
                      <Link href={`/recipes/${recipe.slug.current}`}>
                        <h2>{recipe?.title}</h2>
                      </Link>
                    ) : null}
                    <p>{recipe?.description}</p>
                  </div>
                </li>
              ))
            ) : (
              <p>No recipes found.</p>
            )}
          </ul>
        </div>
        <div className="contact">
          <h2>Contact Us: Because We Care</h2>
          <p>
            Whether you have a burning question, a brilliant idea, or just want
            to tell us about your day, we're all ears!
          </p>
          <p>
            <b>Need immediate assistance?</b>
          </p>
          <p>
            Try yelling really loudly. If that doesn’t work, drop us a line
            here, and we'll get back to you ASAP.
          </p>
          <div className="container">
            <Contact />
          </div>
        </div>
      </main>
    </>
  );
}
