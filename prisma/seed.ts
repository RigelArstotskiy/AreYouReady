/**
 * Seed-файл для локальной разработки и демо.
 * Создаёт тестовых пользователей, менторов и карточки маркетплейса.
 *
 * Запуск: npx prisma db seed
 * Пароль всех тестовых аккаунтов: password123
 *
 * ⚠️ Удаляет все существующие данные перед заполнением.
 * Не запускать на продакшене.
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // -------------------------------------------------------------------
  // 1. Чистим таблицы в правильном порядке (дочерние → родительские)
  // -------------------------------------------------------------------
  await prisma.session.deleteMany();
  await prisma.mockupCard.deleteMany();
  await prisma.mentorTechStack.deleteMany();
  await prisma.mentorServiceType.deleteMany();
  await prisma.mentorProfile.deleteMany();
  await prisma.user.deleteMany();

  // -------------------------------------------------------------------
  // 2. Хешируем пароль (один для всех — удобно для тестов)
  // -------------------------------------------------------------------
  const password = await bcrypt.hash("password123", 10);

  // -------------------------------------------------------------------
  // 3. Создаём менторов
  // -------------------------------------------------------------------
  const mentors = await Promise.all([
    prisma.user.create({
      data: {
        email: "alex@example.com",
        name: "Alex Kovalenko",
        password,
        isMentor: true,
        bio: "Senior Frontend Developer, 6 лет опыта. Помогаю джунам пройти первые интервью.",
        mentorProfile: {
          create: {
            position: "Senior Frontend Developer",
            description:
              "Провёл 200+ мок-интервью. Специализируюсь на React и TypeScript.",
            priceUsd: 30,
            contactInfo: "t.me/alex_kovalenko",
            rating: 4.8,
            sessionsCount: 214,
          },
        },
      },
    }),
    prisma.user.create({
      data: {
        email: "maria@example.com",
        name: "Maria Shevchenko",
        password,
        isMentor: true,
        bio: "Fullstack-разработчик, Node.js + React. Люблю помогать с архитектурой.",
        mentorProfile: {
          create: {
            position: "Fullstack Developer",
            description:
              "Специализируюсь на Node.js и архитектуре API. Code review и разбор реальных задач.",
            priceUsd: 25,
            contactInfo: "t.me/maria_shev",
            rating: 4.9,
            sessionsCount: 98,
          },
        },
      },
    }),
    prisma.user.create({
      data: {
        email: "dmytro@example.com",
        name: "Dmytro Bondarenko",
        password,
        isMentor: true,
        bio: "DevOps-инженер. AWS, Docker, CI/CD. Готовлю к интервью в продуктовые компании.",
        mentorProfile: {
          create: {
            position: "DevOps Engineer",
            description:
              "5 лет в DevOps. Помогаю разобраться с Docker, k8s, GitHub Actions и собеседованиями.",
            priceUsd: 35,
            contactInfo: "t.me/dmytro_devops",
            rating: 4.7,
            sessionsCount: 61,
          },
        },
      },
    }),
    prisma.user.create({
      data: {
        email: "olena@example.com",
        name: "Olena Tkachuk",
        password,
        isMentor: true,
        bio: "React / Next.js developer. Помогаю с подготовкой к техническим интервью и ревью кода.",
        mentorProfile: {
          create: {
            position: "Frontend Developer",
            description:
              "Работаю с Next.js App Router с момента релиза. Разбираю CV и провожу мок-интервью.",
            priceUsd: 0,
            contactInfo: "t.me/olena_front",
            rating: 4.6,
            sessionsCount: 43,
          },
        },
      },
    }),
  ]);

  const [alex, maria, dmytro, olena] = mentors;

  // -------------------------------------------------------------------
  // 4. Создаём студентов
  // -------------------------------------------------------------------
  await Promise.all([
    prisma.user.create({
      data: {
        email: "student1@example.com",
        name: "Ivan Petrenko",
        password,
        isStudent: true,
        bio: "Учусь фронтенду, ищу первую работу.",
      },
    }),
    prisma.user.create({
      data: {
        email: "student2@example.com",
        name: "Kateryna Melnyk",
        password,
        isStudent: true,
        bio: "Junior backend, хочу вырасти до middle за год.",
      },
    }),
    prisma.user.create({
      data: {
        email: "student3@example.com",
        name: "Serhii Kravchenko",
        password,
        isStudent: true,
      },
    }),
  ]);

  // -------------------------------------------------------------------
  // 5. Создаём карточки — 40 штук, распределены по менторам
  // -------------------------------------------------------------------
  const cards = [
    // ── ALEX — JS / TypeScript ──────────────────────────────────────
    {
      mentorId: alex.id,
      title: "JS Junior Interview",
      description:
        "Разбираем замыкания, прототипы, event loop. Типичные вопросы джун-интервью на JS.",
      techStack: ["JavaScript"],
      format: ["interview"],
      priceUsd: 30,
    },
    {
      mentorId: alex.id,
      title: "TypeScript Basics Mock",
      description:
        "Типы, дженерики, утилитарные типы. Готовимся к вопросам по TS на собеседовании.",
      techStack: ["TypeScript"],
      format: ["interview"],
      priceUsd: 30,
    },
    {
      mentorId: alex.id,
      title: "Async JS Deep Dive",
      description:
        "Promise, async/await, микротаски и макротаски. Разбираем порядок выполнения.",
      techStack: ["JavaScript"],
      format: ["interview"],
      priceUsd: 30,
    },
    {
      mentorId: alex.id,
      title: "JS Code Review",
      description:
        "Отправь свой JS-код — разберём читаемость, паттерны, типичные ошибки.",
      techStack: ["JavaScript", "TypeScript"],
      format: ["codereview"],
      priceUsd: 20,
    },
    {
      mentorId: alex.id,
      title: "TS Advanced: Generics & Utility Types",
      description:
        "Conditional types, mapped types, infer. Для тех, кто уже знает основы TS.",
      techStack: ["TypeScript"],
      format: ["interview", "codereview"],
      priceUsd: 35,
    },
    {
      mentorId: alex.id,
      title: "CV Review для Frontend Junior",
      description:
        "Разбираем CV: структура, формулировки, что убрать, что добавить.",
      techStack: ["JavaScript", "TypeScript"],
      format: ["cvreview"],
      priceUsd: 15,
    },
    {
      mentorId: alex.id,
      title: "DOM & Browser APIs Mock",
      description:
        "Event delegation, MutationObserver, Web APIs — вопросы, которые часто задают на интервью.",
      techStack: ["JavaScript"],
      format: ["interview"],
      priceUsd: 30,
    },
    {
      mentorId: alex.id,
      title: "Functional JS Patterns",
      description:
        "Чистые функции, иммутабельность, compose/pipe. Код-ревью + теория.",
      techStack: ["JavaScript", "TypeScript"],
      format: ["interview", "codereview"],
      priceUsd: 30,
    },
    {
      mentorId: alex.id,
      title: "OOP в JavaScript",
      description:
        "Классы, прототипное наследование, паттерны. Готовимся к вопросам на middle-уровне.",
      techStack: ["JavaScript", "TypeScript"],
      format: ["interview"],
      priceUsd: 30,
    },
    {
      mentorId: alex.id,
      title: "Бесплатный мок — JS основы",
      description:
        "Пробное интервью на 30 минут. Только базовые вопросы по JS. Для первого раза.",
      techStack: ["JavaScript"],
      format: ["interview"],
      priceUsd: 0,
    },

    // ── MARIA — React / Next.js ─────────────────────────────────────
    {
      mentorId: maria.id,
      title: "React Junior Mock Interview",
      description:
        "useState, useEffect, props, lifting state up — вопросы для джуна на React.",
      techStack: ["React"],
      format: ["interview"],
      priceUsd: 25,
    },
    {
      mentorId: maria.id,
      title: "React Hooks Deep Dive",
      description:
        "useCallback, useMemo, useRef, кастомные хуки. Разбираем когда и зачем.",
      techStack: ["React"],
      format: ["interview"],
      priceUsd: 25,
    },
    {
      mentorId: maria.id,
      title: "Next.js App Router Mock",
      description:
        "Server vs Client компоненты, layouts, loading, error — типичные вопросы по App Router.",
      techStack: ["Next.js"],
      format: ["interview"],
      priceUsd: 25,
    },
    {
      mentorId: maria.id,
      title: "React Code Review",
      description:
        "Присылай компонент — разбираем архитектуру, хуки, оптимизацию.",
      techStack: ["React", "TypeScript"],
      format: ["codereview"],
      priceUsd: 20,
    },
    {
      mentorId: maria.id,
      title: "Next.js Full-Stack Code Review",
      description:
        "Смотрю API routes, серверные компоненты, работу с данными. Prisma — тоже.",
      techStack: ["Next.js", "TypeScript"],
      format: ["codereview"],
      priceUsd: 25,
    },
    {
      mentorId: maria.id,
      title: "State Management Interview",
      description:
        "Context, Zustand, Redux Toolkit — вопросы и сравнение подходов.",
      techStack: ["React", "TypeScript"],
      format: ["interview"],
      priceUsd: 25,
    },
    {
      mentorId: maria.id,
      title: "CV Review — Fullstack",
      description:
        "Смотрю CV фулстек-разработчика. Даю фидбек по структуре и формулировкам.",
      techStack: ["React", "Next.js", "Node.js"],
      format: ["cvreview"],
      priceUsd: 15,
    },
    {
      mentorId: maria.id,
      title: "React Performance Mock",
      description:
        "Reconciliation, memo, виртуализация, профилировщик — для middle-уровня.",
      techStack: ["React"],
      format: ["interview"],
      priceUsd: 30,
    },
    {
      mentorId: maria.id,
      title: "Node.js REST API Mock",
      description:
        "Express, middleware, error handling, структура проекта. Вопросы уровня junior/middle.",
      techStack: ["Node.js"],
      format: ["interview"],
      priceUsd: 25,
    },
    {
      mentorId: maria.id,
      title: "Node.js Code Review",
      description:
        "Ревью твоего Node.js проекта или API. Смотрю архитектуру, безопасность, читаемость.",
      techStack: ["Node.js", "TypeScript"],
      format: ["codereview"],
      priceUsd: 20,
    },

    // ── DMYTRO — Node.js / DevOps ───────────────────────────────────
    {
      mentorId: dmytro.id,
      title: "Docker Interview Prep",
      description:
        "Образы, контейнеры, volumes, networks, docker-compose — вопросы с реальных интервью.",
      techStack: ["Docker"],
      format: ["interview"],
      priceUsd: 35,
    },
    {
      mentorId: dmytro.id,
      title: "CI/CD Pipeline Mock",
      description:
        "GitHub Actions, GitLab CI — разбираем пайплайны и типичные вопросы на интервью.",
      techStack: ["Docker", "GitHub Actions"],
      format: ["interview"],
      priceUsd: 35,
    },
    {
      mentorId: dmytro.id,
      title: "Docker Code Review",
      description:
        "Смотрю твой Dockerfile и docker-compose.yml — слои, кеш, безопасность.",
      techStack: ["Docker"],
      format: ["codereview"],
      priceUsd: 30,
    },
    {
      mentorId: dmytro.id,
      title: "Node.js Performance Interview",
      description:
        "Event loop, streams, clustering, memory leaks — вопросы для senior-уровня.",
      techStack: ["Node.js"],
      format: ["interview"],
      priceUsd: 40,
    },
    {
      mentorId: dmytro.id,
      title: "DevOps CV Review",
      description:
        "Разбираю CV DevOps/Backend инженера. Что убрать, что добавить, как формулировать.",
      techStack: ["Docker", "Node.js"],
      format: ["cvreview"],
      priceUsd: 20,
    },
    {
      mentorId: dmytro.id,
      title: "Linux & Shell для разработчика",
      description:
        "Базовые команды, bash-скрипты, права доступа — вопросы, которые задают на DevOps-интервью.",
      techStack: ["Docker"],
      format: ["interview"],
      priceUsd: 35,
    },
    {
      mentorId: dmytro.id,
      title: "Node.js + Docker: Full Review",
      description:
        "Смотрю твой Node.js проект в Docker: Dockerfile, compose, переменные окружения.",
      techStack: ["Node.js", "Docker"],
      format: ["codereview"],
      priceUsd: 40,
    },
    {
      mentorId: dmytro.id,
      title: "Бесплатный DevOps Q&A",
      description:
        "30 минут вопросов и ответов про DevOps-путь. Что учить, с чего начать, как попасть в профессию.",
      techStack: ["Docker"],
      format: ["interview"],
      priceUsd: 0,
    },

    // ── OLENA — React / Next.js ─────────────────────────────────────
    {
      mentorId: olena.id,
      title: "Next.js CV Review",
      description:
        "Смотрю CV фронтенд-разработчика с Next.js. Даю конкретные правки.",
      techStack: ["Next.js", "React"],
      format: ["cvreview"],
      priceUsd: 0,
    },
    {
      mentorId: olena.id,
      title: "React Junior: первое интервью",
      description:
        "Симуляция реального интервью на джун-позицию. Вопросы + фидбек после.",
      techStack: ["React"],
      format: ["interview"],
      priceUsd: 0,
    },
    {
      mentorId: olena.id,
      title: "Next.js App Router: Code Review",
      description:
        "Ревью проекта на App Router — серверные компоненты, layout, fetch, кеширование.",
      techStack: ["Next.js", "TypeScript"],
      format: ["codereview"],
      priceUsd: 0,
    },
    {
      mentorId: olena.id,
      title: "React + TypeScript Interview",
      description:
        "Типизация компонентов, пропсов, хуков. Вопросы для уровня junior/middle.",
      techStack: ["React", "TypeScript"],
      format: ["interview"],
      priceUsd: 0,
    },
    {
      mentorId: olena.id,
      title: "Next.js + Prisma Code Review",
      description:
        "Смотрю как организованы API routes, работа с Prisma и серверная логика.",
      techStack: ["Next.js", "TypeScript"],
      format: ["codereview"],
      priceUsd: 0,
    },
    {
      mentorId: olena.id,
      title: "Tailwind + React Code Review",
      description:
        "Разбираем структуру компонентов, стилизацию, переиспользование.",
      techStack: ["React"],
      format: ["codereview"],
      priceUsd: 0,
    },
    {
      mentorId: olena.id,
      title: "Бесплатный мок — React basics",
      description:
        "Открытое мок-интервью для новичков. Без стресса, с подробным разбором.",
      techStack: ["React"],
      format: ["interview"],
      priceUsd: 0,
    },
    {
      mentorId: olena.id,
      title: "React Architecture Talk",
      description:
        "Обсуждаем архитектуру твоего проекта: папки, компоненты, слои. Без кода.",
      techStack: ["React", "Next.js"],
      format: ["interview"],
      priceUsd: 0,
    },
    {
      mentorId: olena.id,
      title: "CV Review — Frontend Beginner",
      description:
        "Для тех, кто ещё не работал в IT. Разбираем пет-проекты, описание, подачу.",
      techStack: ["React", "JavaScript"],
      format: ["cvreview"],
      priceUsd: 0,
    },
    {
      mentorId: olena.id,
      title: "Next.js SSR vs SSG Interview",
      description:
        "getServerSideProps, generateStaticParams, revalidate — разбираем вопросы с интервью.",
      techStack: ["Next.js"],
      format: ["interview"],
      priceUsd: 0,
    },
    {
      mentorId: olena.id,
      title: "Полный фронтенд мок — Junior",
      description:
        "Симуляция полного интервью: HTML/CSS, JS, React, вопросы по проектам. 60 минут.",
      techStack: ["JavaScript", "React", "TypeScript"],
      format: ["interview", "cvreview"],
      priceUsd: 0,
    },
  ];

  await prisma.mockupCard.createMany({ data: cards });

  console.log(`✅ Seed завершён:`);
  console.log(`   👤 4 ментора, 3 студента`);
  console.log(`   🃏 ${cards.length} карточек`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
