import {Factories} from "./helpers/factory";
import {DataSource} from "typeorm";
import {INestApplication} from "@nestjs/common";
import {TestingModule} from "@nestjs/testing";
import {faker} from "@faker-js/faker";
import {User} from "../src/auth/users/users.entity";
import {userData} from "./fixtures/test-consts";
import {PasswordsService} from "../src/auth/passwords/passwords.service";


export async function initFactories(app: INestApplication | TestingModule) {
    const factories = new Factories(app.get(DataSource));
    factories.registerFactory(User, {
        username: () => faker.internet.userName(),
        email: () => faker.internet.email(),
        password: async () => await (app.get(PasswordsService).hash(userData.password)),
    });


    return factories;
}