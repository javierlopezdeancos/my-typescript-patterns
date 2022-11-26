type User = {
  name: string;
  say: () => void;
};

class UserFactory {
  createUser(name: string): User {
    return {
      name,
      say: function (): void {
        console.log("User: " + this.name);
      }
    }
  }
}

type DecoratedUser = {
  name: string;
  street: string;
  city: string;
  say: () => void;
}

class DecoratedUserFactory  {
  createUser(user: User, street: string, city: string): DecoratedUser {
    return {
      name: user.name,
      street,
      city,
      say: function (): void {
        console.log("Decorated User: " + this.name + ", " + this.street + ", " + this.city);
      }
    }
  }
}

const user = new UserFactory().createUser("Kelly");
user.say();

// Output
// 'User: Kelly'

const decorated = new DecoratedUserFactory().createUser(user, "Broadway", "New York");
decorated.say();

// Output
// 'Decorated User: Kelly, Broadway, New York'
