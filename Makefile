create-canisters:
	dfx canister create --all
	dfx generate backend
	dfx generate ic_siwe_provider
	dfx generate ic_siws_provider


# SIWE SOLANA
deploy-provider-eth:
	dfx deploy ic_siwe_provider --argument "( \
	    record { \
	        domain = \"http://127.0.0.1:3000\"; \
	        uri = \"http://127.0.0.1:3000\"; \
	        salt = \"salt\"; \
	        chain_id = opt 1; \
	        scheme = opt \"http\"; \
	        statement = opt \"LOGIN LINKFINITY\"; \
	        sign_in_expires_in = opt 300000000000; /* 5 minutes */ \
	        session_expires_in = opt 604800000000000; /* 1 week */ \
	        targets = opt vec { \
	            \"$$(dfx canister id ic_siwe_provider)\"; \
	            \"$$(dfx canister id backend)\"; \
	        }; \
	    } \
	)"

upgrade-provider-eth:
	dfx canister install ic_siwe_provider --mode upgrade --upgrade-unchanged --argument "( \
	    record { \
	        domain = \"localhost:3000\"; \
	        uri = \"http://localhost:3000\"; \
	        salt = \"salt\"; \
	        chain_id = opt 1; \
	        scheme = opt \"http\"; \
	        statement = opt \"LOGIN LINKFINITY\"; \
	        sign_in_expires_in = opt 300000000000; /* 5 minutes */ \
	        session_expires_in = opt 604800000000000; /* 1 week */ \
	        targets = opt vec { \
	            \"$$(dfx canister id ic_siwe_provider)\"; \
	            \"$$(dfx canister id backend)\"; \
	        }; \
	    } \
	)"


# SIWS SOLANA
deploy-provider-solana:
	dfx deploy ic_siws_provider --argument "( \
	    record { \
	        domain = \"127.0.0.1\"; \
	        uri = \"http://127.0.0.1:3000\"; \
	        salt = \"salt\"; \
	        chain_id = opt \"mainnet\"; \
	        scheme = opt \"http\"; \
	        statement = opt \"LOGIN LINKFINITY\"; \
	        sign_in_expires_in = opt 300000000000; /* 5 minutes */ \
	        session_expires_in = opt 604800000000000; /* 1 week */ \
	        targets = opt vec { \
	            \"$$(dfx canister id ic_siws_provider)\"; \
	            \"$$(dfx canister id backend)\"; \
	        }; \
	    } \
	)"

upgrade-provider-solana:
	dfx canister install ic_siws_provider --mode upgrade --upgrade-unchanged --argument "( \
	    record { \
	        domain = \"localhost:3000\"; \
	        uri = \"http://localhost:3000\"; \
	        salt = \"salt\"; \
	        chain_id = opt \"mainnet\"; \
	        scheme = opt \"http\"; \
	        statement = opt \"LOGIN LINKFINITY\"; \
	        sign_in_expires_in = opt 300000000000; /* 5 minutes */ \
	        session_expires_in = opt 604800000000000; /* 1 week */ \
	        targets = opt vec { \
	            \"$$(dfx canister id ic_siws_provider)\"; \
	            \"$$(dfx canister id backend)\"; \
	        }; \
	    } \
	)"

deploy-backend:
	dfx deploy backend 

deploy-frontend:
	dfx deploy frontend

deploy-all: create-canisters deploy-provider-solana deploy-provider-eth deploy-frontend
# deploy-backend 
deploy-upgrade-provider: upgrade-provider-eth upgrade-provider-solana


# run-frontend:
# 	pnpm install
# 	pnpm run dev

clean:
	rm -rf .dfx
	rm -rf dist
	rm -rf src/declarations
	rm -f .env
# 	cargo clean