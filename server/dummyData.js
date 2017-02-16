import Role from './models/role';
import ProductCategory from './models/productcategory';
import Allergen from './models/allergen';
import Ingredient from './models/ingredient';
import Page from './models/page';

export default function () {

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
    const productcategory1 = new ProductCategory({ name: 'Middagsmat' });
    const productcategory2 = new ProductCategory({ name: 'Snittar og smørbrød' });
    const productcategory3 = new ProductCategory({ name: 'Lunsjretter' });
    const productcategory4 = new ProductCategory({ name: 'Dessert' });
    const productcategory5 = new ProductCategory({ name: 'Bakarvarer' });
    const productcategory6 = new ProductCategory({ name: 'Frukt' });
    const productcategory7 = new ProductCategory({ name: 'Grønnsaker' });
    const productcategory8 = new ProductCategory({ name: 'Bær' });
    const productcategory9 = new ProductCategory({ name: 'Sopp' });
    const productcategory10 = new ProductCategory({ name: 'Tang og tare' });
    const productcategory11 = new ProductCategory({ name: 'Pålegg' });
    const productcategory12 = new ProductCategory({ name: 'Ost' });
    const productcategory13 = new ProductCategory({ name: 'Vilt' });
    const productcategory14 = new ProductCategory({ name: 'Kjøtt' });
    const productcategory15 = new ProductCategory({ name: 'Fisk' });
    const productcategory16 = new ProductCategory({ name: 'Skaldyr' });
    const productcategory17 = new ProductCategory({ name: 'Drikke' });
    ProductCategory.create([productcategory1, productcategory2, productcategory3, productcategory4, productcategory5, productcategory6, productcategory7, productcategory8, productcategory9, productcategory10, productcategory11, productcategory12, productcategory13, productcategory14, productcategory15, productcategory16, productcategory17 ], (error) => {
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


  Page.count().exec((err, count) => {
    if (count > 0) {
      return;
    }
    const page1 = new Page({ type: 'Help' });
    const page2 = new Page({ type: 'About' });
    const page3 = new Page({ type: 'Terms' });
    const page4 = new Page({ type: 'Privacy'});
    const page5 = new Page({ type: 'FAQ' });
    Page.create([page1, page2, page3, page4, page5], (error) => {
      if (!error) {
        console.log('ready to go....');
      }
      else{
        console.log(error);
      }
    });
  });
}
