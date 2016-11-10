import Post from './models/post';
import Role from './models/role';
import ProductCategory from './models/productcategory';
import Allergen from './models/allergen';
import Ingredient from './models/ingredient';

export default function () {
  Post.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    const content1 = `Sed ut perspiciatis unde omnis iste natus error
      sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
      eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae
      vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
      aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
      qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
      ipsum quia dolor sit amet. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
      enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
      ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
      in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
      occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum`;

    const content2 = `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
      enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
      ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
      in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
      occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum. Sed ut perspiciatis unde omnis iste natus error
      sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
      eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae
      vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
      aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
      qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
      ipsum quia dolor sit amet.`;

    const post1 = new Post({ name: 'Admin', title: 'Hello MERN', slug: 'hello-mern', cuid: 'cikqgkv4q01ck7453ualdn3hd', content: content1 });
    const post2 = new Post({ name: 'Admin', title: 'Lorem Ipsum', slug: 'lorem-ipsum', cuid: 'cikqgkv4q01ck7453ualdn3hf', content: content2 });

    Post.create([post1, post2], (error) => {
      if (!error) {
        // console.log('ready to go....');
      }
    });
  });

  Role.count().exec((err, count) => {
    if (count > 0) {
      return;
    }
    const role1 = new Role({ name: 'Admin' });
    const role2 = new Role({ name: 'Producer' });
    const role3 = new Role({ name: 'User' });
    Role.create([role1, role2, role3], (error) => {
      if (!error) {
        // console.log('ready to go....');
      }
    });
  });


  ProductCategory.count().exec((err, count) => {
    if (count > 0) {
      return;
    }
    const productcategory1 = new ProductCategory({ name: 'Spicy' });
    const productcategory2 = new ProductCategory({ name: 'Crunchy' });
    const productcategory3 = new ProductCategory({ name: 'Roasted' });
    ProductCategory.create([productcategory1, productcategory2, productcategory3], (error) => {
      if (!error) {
        // console.log('ready to go....');
      }
    });
  });

  Allergen.count().exec((err, count) => {
    if (count > 0) {
      return;
    }
    const allergen1 = new Allergen({ name: 'Fish' });
    const allergen2 = new Allergen({ name: 'Milk'});
    const allergen3 = new Allergen({ name: 'Nuts' });
    Allergen.create([allergen1, allergen2, allergen3], (error) => {
      if (!error) {
        // console.log('ready to go....');
      }
    });
  });

  Ingredient.count().exec((err, count) => {
    if (count > 0) {
      return;
    }
    const ingredient1 = new Ingredient({ name: 'Salt' });
    const ingredient2 = new Ingredient({ name: 'Olive Oil'});
    const ingredient3 = new Ingredient({ name: 'Eggs' });
    Ingredient.create([ingredient1, ingredient2, ingredient3], (error) => {
      if (!error) {
        // console.log('ready to go....');
      }
    });
  });
}
