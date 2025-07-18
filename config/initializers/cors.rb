Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
        origins "*" # Puerto de React dev server

        resource "*",
        headers: :any,
        methods: [ :get, :post, :put, :patch, :delete, :options, :head ],
        credentials: false
    end
end
