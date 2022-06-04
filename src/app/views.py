from django.shortcuts import render


def index(request):
    context = {
        'connected': False,
        'presentations': [
            {
                'title': "Sat hello to your new members",
                'content': "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at ipsum dolor. Duis lorem justo, fermentum vitae nisi vitae, tincidunt suscipit velit. Curabitur dignissim odio et convallis volutpat. Suspendisse ut nisi volutpat, malesuada nunc interdum, fermentum justo. "
            },
            {
                'title': "Powerful moderation",
                'content': "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at ipsum dolor. Duis lorem justo, fermentum vitae nisi vitae, tincidunt suscipit velit. Curabitur dignissim odio et convallis volutpat. Suspendisse ut nisi volutpat, malesuada nunc interdum, fermentum justo. "
            },
            {
                'title': "Leveling",
                'content': "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at ipsum dolor. Duis lorem justo, fermentum vitae nisi vitae, tincidunt suscipit velit. Curabitur dignissim odio et convallis volutpat. Suspendisse ut nisi volutpat, malesuada nunc interdum, fermentum justo. "
            },
            {
                'title': "Listen to music",
                'content': "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at ipsum dolor. Duis lorem justo, fermentum vitae nisi vitae, tincidunt suscipit velit. Curabitur dignissim odio et convallis volutpat. Suspendisse ut nisi volutpat, malesuada nunc interdum, fermentum justo. "
            }
        ]
    }
    return render(request, "app/index.html", context)

