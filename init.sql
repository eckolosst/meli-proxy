CREATE TABLE public.use_statistic (
	id serial NOT NULL,
	ip_origin inet NULL,
	path_destination varchar NULL,
	http_method varchar NULL,
	"timestamp" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT use_statistic_pkey PRIMARY KEY (id)
);
