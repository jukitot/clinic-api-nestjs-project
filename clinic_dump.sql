--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: clinic; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.clinic (
    id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.clinic OWNER TO postgres;

--
-- Name: clinic_doctors_doctor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.clinic_doctors_doctor (
    "clinicId" integer NOT NULL,
    "doctorId" integer NOT NULL
);


ALTER TABLE public.clinic_doctors_doctor OWNER TO postgres;

--
-- Name: clinic_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.clinic_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.clinic_id_seq OWNER TO postgres;

--
-- Name: clinic_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.clinic_id_seq OWNED BY public.clinic.id;


--
-- Name: doctor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.doctor (
    id integer NOT NULL,
    "firstName" character varying NOT NULL,
    "lastName" character varying NOT NULL,
    phone character varying,
    email character varying
);


ALTER TABLE public.doctor OWNER TO postgres;

--
-- Name: doctor_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.doctor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.doctor_id_seq OWNER TO postgres;

--
-- Name: doctor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.doctor_id_seq OWNED BY public.doctor.id;


--
-- Name: doctor_services_medical_service; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.doctor_services_medical_service (
    "doctorId" integer NOT NULL,
    "medicalServiceId" integer NOT NULL
);


ALTER TABLE public.doctor_services_medical_service OWNER TO postgres;

--
-- Name: medical_service; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.medical_service (
    id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.medical_service OWNER TO postgres;

--
-- Name: medical_service_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.medical_service_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.medical_service_id_seq OWNER TO postgres;

--
-- Name: medical_service_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.medical_service_id_seq OWNED BY public.medical_service.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    role character varying DEFAULT 'user'::character varying NOT NULL,
    "resetPasswordToken" character varying,
    "resetPasswordExpires" timestamp without time zone
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_id_seq OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: clinic id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clinic ALTER COLUMN id SET DEFAULT nextval('public.clinic_id_seq'::regclass);


--
-- Name: doctor id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctor ALTER COLUMN id SET DEFAULT nextval('public.doctor_id_seq'::regclass);


--
-- Name: medical_service id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.medical_service ALTER COLUMN id SET DEFAULT nextval('public.medical_service_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: clinic; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.clinic (id, name) FROM stdin;
7	Клиника Dobra
8	Downtown Medical Center
10	Harmony Health Clinic
11	Sunrise Family Clinic
12	Lakeside Medical Group
\.


--
-- Data for Name: clinic_doctors_doctor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.clinic_doctors_doctor ("clinicId", "doctorId") FROM stdin;
7	13
7	15
10	15
11	10
11	11
11	12
12	10
12	11
12	12
\.


--
-- Data for Name: doctor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.doctor (id, "firstName", "lastName", phone, email) FROM stdin;
9	John	Doe	1234567890	john.doe@example.com
10	Emily	Smith	2345678901	emily.smith@example.com
11	Michael	Brown	3456789012	michael.brown@example.com
12	Sarah	Johnson	4567890123	sarah.johnson@example.com
13	David	Wilson	5678901234	david.wilson@example.com
15	James	Taylor	7890123456	james.taylor@example.com
16	Sophia	Clark	0123456789	sophia.clark@example.com
17	Daniel	Anderson	9012345678	daniel.anderson@example.com
18	Olivia	Martinez	8901234567	olivia.martinez@example.com
\.


--
-- Data for Name: doctor_services_medical_service; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.doctor_services_medical_service ("doctorId", "medicalServiceId") FROM stdin;
10	15
11	11
12	11
12	12
13	11
13	13
15	11
15	13
16	13
16	14
17	13
17	14
18	15
18	16
\.


--
-- Data for Name: medical_service; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.medical_service (id, name) FROM stdin;
2	Ginecology
3	Pediatry
4	Travmatology
6	Hirurgia
7	Cardiology
8	Dermatology
9	Pediatrics
11	Orthopedics
12	Gynecology
13	Ophthalmology
14	Radiology
15	General Surgery
16	Psychiatry
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, email, password, role, "resetPasswordToken", "resetPasswordExpires") FROM stdin;
5	irzhyckaya@gmail.com	$2b$10$BIk9UBKw.0Ia1X/nyMmS4uOwq23LSRcDd4j9xsk1HRzfwo.twwXN2	admin	\N	\N
\.


--
-- Name: clinic_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.clinic_id_seq', 12, true);


--
-- Name: doctor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.doctor_id_seq', 18, true);


--
-- Name: medical_service_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.medical_service_id_seq', 16, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 5, true);


--
-- Name: doctor_services_medical_service PK_0a6823ddabb22bf903ba3f9de2f; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctor_services_medical_service
    ADD CONSTRAINT "PK_0a6823ddabb22bf903ba3f9de2f" PRIMARY KEY ("doctorId", "medicalServiceId");


--
-- Name: medical_service PK_66933e54c5740c22e8508fce480; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.medical_service
    ADD CONSTRAINT "PK_66933e54c5740c22e8508fce480" PRIMARY KEY (id);


--
-- Name: clinic PK_8e97c18debc9c7f7606e311d763; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clinic
    ADD CONSTRAINT "PK_8e97c18debc9c7f7606e311d763" PRIMARY KEY (id);


--
-- Name: clinic_doctors_doctor PK_b3f99cb956c38b9004f04596069; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clinic_doctors_doctor
    ADD CONSTRAINT "PK_b3f99cb956c38b9004f04596069" PRIMARY KEY ("clinicId", "doctorId");


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- Name: doctor PK_ee6bf6c8de78803212c548fcb94; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctor
    ADD CONSTRAINT "PK_ee6bf6c8de78803212c548fcb94" PRIMARY KEY (id);


--
-- Name: medical_service UQ_0bdae7c0812679ee61cdcad2596; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.medical_service
    ADD CONSTRAINT "UQ_0bdae7c0812679ee61cdcad2596" UNIQUE (name);


--
-- Name: doctor UQ_a69863cded89c459b5898b92353; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctor
    ADD CONSTRAINT "UQ_a69863cded89c459b5898b92353" UNIQUE (phone);


--
-- Name: doctor UQ_bf6303ac911efaab681dc911f54; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctor
    ADD CONSTRAINT "UQ_bf6303ac911efaab681dc911f54" UNIQUE (email);


--
-- Name: clinic UQ_c8daa8ffcad86f9ba63a5c70286; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clinic
    ADD CONSTRAINT "UQ_c8daa8ffcad86f9ba63a5c70286" UNIQUE (name);


--
-- Name: user UQ_e12875dfb3b1d92d7d7c5377e22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);


--
-- Name: IDX_16baca4a1d55c887b503004ade; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_16baca4a1d55c887b503004ade" ON public.clinic_doctors_doctor USING btree ("doctorId");


--
-- Name: IDX_84d61786611d2d03cc51841bca; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_84d61786611d2d03cc51841bca" ON public.doctor_services_medical_service USING btree ("medicalServiceId");


--
-- Name: IDX_930de2d1fe550112d8767a3712; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_930de2d1fe550112d8767a3712" ON public.doctor_services_medical_service USING btree ("doctorId");


--
-- Name: IDX_9eb54900314b95fdf7b5cd601e; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_9eb54900314b95fdf7b5cd601e" ON public.clinic_doctors_doctor USING btree ("clinicId");


--
-- Name: clinic_doctors_doctor FK_16baca4a1d55c887b503004ade9; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clinic_doctors_doctor
    ADD CONSTRAINT "FK_16baca4a1d55c887b503004ade9" FOREIGN KEY ("doctorId") REFERENCES public.doctor(id);


--
-- Name: doctor_services_medical_service FK_84d61786611d2d03cc51841bcae; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctor_services_medical_service
    ADD CONSTRAINT "FK_84d61786611d2d03cc51841bcae" FOREIGN KEY ("medicalServiceId") REFERENCES public.medical_service(id);


--
-- Name: doctor_services_medical_service FK_930de2d1fe550112d8767a37128; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctor_services_medical_service
    ADD CONSTRAINT "FK_930de2d1fe550112d8767a37128" FOREIGN KEY ("doctorId") REFERENCES public.doctor(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: clinic_doctors_doctor FK_9eb54900314b95fdf7b5cd601e9; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clinic_doctors_doctor
    ADD CONSTRAINT "FK_9eb54900314b95fdf7b5cd601e9" FOREIGN KEY ("clinicId") REFERENCES public.clinic(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

